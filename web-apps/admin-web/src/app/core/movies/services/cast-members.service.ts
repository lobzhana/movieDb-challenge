import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cleanObject } from 'src/app/_shared/tools/object-tools';

import { HttpProxyService } from '../../http-proxy.service';
import { CastMemberModel } from '../models/cast-member.model';

@Injectable({
  providedIn: 'root',
})
export class CastMembersService {
  endpoints = {
    SEARCH: 'cast_members',
    ADD_CAST_MEMBER: 'cast_members',
    EDIT_CAST_MEMBER: 'cast_members',
    ADD_TO_MOVIE: (movieId) => `cast_members/${movieId}`,
    REMOVE_FROM_MOVIE: (movieId, castMemberId) =>
      `cast_members/${movieId}/${castMemberId}`,
    GET_LIST: (movieId) => `cast_members/${movieId}`,
  };

  constructor(private http: HttpProxyService) {}

  save(
    model: CastMemberModel
  ): Observable<{ ok: boolean; message: string; data: CastMemberModel }> {
    if (!model.castId) {
      return this.http.post(
        this.endpoints.EDIT_CAST_MEMBER,
        cleanObject(model)
      );
    } else {
      return this.http.put(this.endpoints.ADD_CAST_MEMBER, cleanObject(model));
    }
  }

  addToMovie(
    movieId: string,
    castMemberIds: string[]
  ): Observable<{ ok: boolean }> {
    return this.http.post(this.endpoints.ADD_TO_MOVIE(movieId), castMemberIds);
  }

  removeFromMovie(
    movieId: string,
    castMemberId: string
  ): Observable<{ ok: boolean }> {
    return this.http.delete(
      this.endpoints.REMOVE_FROM_MOVIE(movieId, castMemberId)
    );
  }

  search(searchValue: string): Observable<any> {
    return this.http.get(this.endpoints.SEARCH, {
      params: { searchValue },
    });
  }

  getList(movieId: string): Observable<CastMemberModel[]> {
    return this.http.get(this.endpoints.GET_LIST(movieId));
  }
}

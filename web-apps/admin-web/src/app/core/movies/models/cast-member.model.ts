export interface CastMemberModel {
  castId: string;
  photo: { fileName: string };
  firstName: string;
  lastName: string;
  birthDate: Date;
  height: number;
}

export const emptyCastMember = (): CastMemberModel => {
  return {
    castId: null,
    birthDate: null,
    firstName: '',
    lastName: '',
    height: 0,
    photo: null,
  };
};

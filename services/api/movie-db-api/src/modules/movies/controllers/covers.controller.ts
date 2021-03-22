import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Controller('covers')
export class CoverController {
  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: 'uploads/covers',
        filename: (req, file, cb) =>
          cb(null, uuid() + extname(file.originalname)),
      }),
      fileFilter: (req, file, cb) => {
        const accepted =
          ['image/jpeg', 'image/png'].indexOf(file.mimetype) != -1;
        const error = accepted
          ? null
          : {
              name: 'InvalidMimeType',
              message: `mimeType: ${file.mimetype} not allowed`,
            };
        return cb(error, accepted);
      },
    }),
  )
  uploadCover(@UploadedFile() file: Express.Multer.File): { fileName: string } {
    console.log('uploaded file:');
    console.log(file);

    return { fileName: file?.filename };
  }

  @Get(':coverId')
  async getCover(
    @Param('coverId') coverId: string,
    @Res() response: any,
  ): Promise<any> {
    await response.sendFile(coverId, { root: 'uploads/covers' });
  }
}

import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    return this.imageService.upload(file.originalname, file);
  }
}

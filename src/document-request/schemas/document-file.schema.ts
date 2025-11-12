import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DocumentFile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Utilisateur', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  nomFichier: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: Types.ObjectId, ref: 'DocumentRequest', required: false })
  documentRequestId?: Types.ObjectId;
}

export type DocumentFileDocument = DocumentFile & Document;
export const DocumentFileSchema = SchemaFactory.createForClass(DocumentFile);

// Index pour améliorer les performances des requêtes
DocumentFileSchema.index({ userId: 1 });
DocumentFileSchema.index({ documentRequestId: 1 });


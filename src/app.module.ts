import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { LoggerMiddleware } from './common/middlewear/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { ClubsModule } from './clubs/clubs.module';
import { InternshipOfferModule } from './internship-offer/internship-offer.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    // ✅ Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ MongoDB connection (safe for TS)
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/dam'),

    UtilisateursModule,
    AuthModule,
    ClubsModule,
    InternshipOfferModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

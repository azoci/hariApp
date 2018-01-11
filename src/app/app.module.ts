import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ItemService } from './shared/services/stock-service/item.service';
import { AnalysisService } from './shared/services/stock-service/analysis.service';
import { HistoryService } from './shared/services/stock-service/history.service';
import { PersonalService } from './shared/services/stock-service/personal.service';
import { LoginServiceService } from './shared/services/common-service/login-service.service';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,
        ItemService,
        AnalysisService,
        HistoryService,
        PersonalService,
        LoginServiceService,
        AuthInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
declare var $: any;

@Injectable({ providedIn: 'root' })
export class DataService {
	public isAPICalling: boolean = false;

	public imageURL = environment.Image_Base;
	public API_URL = environment.API_URL;


	constructor(private http: HttpClient) { }


	callAPI(method: string, apiData: any, endPoint: string): Observable<any> | undefined {

		let baseURL = environment.API_URL;
		baseURL = `${baseURL}/${endPoint}`
		this.isAPICalling = true;

		if (method.toLowerCase() == 'post') {
			return new Observable((observer) => {
				this.http.post(baseURL, apiData).subscribe((data: any) => {
					observer.next(data);
				}, (error) => {
					this.isAPICalling = false;
					observer.error(error)
				}, () => {
					observer.complete();
					this.isAPICalling = false;
				})
			});
		} else if (method.toLowerCase() == 'put') {
			return new Observable((observer) => {
				this.http.put(baseURL, apiData).subscribe((data: any) => {
					observer.next(data);
				}, (error) => {
					this.isAPICalling = false;
					observer.error(error)
				}, () => {
					observer.complete();
					this.isAPICalling = false;
				})
			});
		} else if (method.toLowerCase() == 'get') {
			return new Observable((observer) => {
				this.http.get(baseURL, {params: apiData}).subscribe((data: any) => {
					observer.next(data);
				}, (error) => {
					this.isAPICalling = false;
					observer.error(error)
				}, () => {
					observer.complete();
					this.isAPICalling = false;
				})
			});
		} else if (method.toLowerCase() == 'delete') {
			const options = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				}),
				body: apiData
			}
			return new Observable((observer) => {
				this.http.delete(baseURL, options).subscribe((data: any) => {
					observer.next(data);
				}, (error) => {
					this.isAPICalling = false;
					observer.error(error)
				}, () => {
					observer.complete();
					this.isAPICalling = false;
				})
			});
		} else if (method.toLowerCase() == 'patch') {
			const options = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
			}
			return new Observable((observer) => {
				this.http.patch(baseURL, apiData, options).subscribe((data: any) => {
					observer.next(data);
				}, (error) => {
					this.isAPICalling = false;
					observer.error(error)
				}, () => {
					observer.complete();
					this.isAPICalling = false;
				})
			});
		} else {
			return new Observable((observer) => {
				this.http.get(baseURL + '?' + apiData).subscribe((data: any) => {
					observer.next(data);
				}, (error) => {
					this.isAPICalling = false;
					observer.error(error)
				}, () => {
					observer.complete();
					this.isAPICalling = false;
				})
			});
		}
	}


	getImageFromBase64(base64String: string) {
		const date = new Date().valueOf();
		let text = '';
		const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++) {
			text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
		}
		// Replace extension according to your media type
		const imageName = date + '_' + text + '.jpg';
		// call method that creates a blob from dataUri
		const imageBlob = this.dataURItoBlob(base64String.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
		const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
		return imageFile;
	}
	dataURItoBlob(dataURI: string) {
		const byteString = window.atob(dataURI);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: 'image/jpeg' });
		return blob;
	}
}

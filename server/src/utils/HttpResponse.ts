export class HttpResponse {
  public statusCode: number
  public message: string
  public data: Object | null

  public constructor(statusCode: number, message: string, data: Object | null) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}
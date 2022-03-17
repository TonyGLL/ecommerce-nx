const httpMethodCodes: any = {
  DELETE: 204,
  GET: 200,
  PATCH: 204,
  POST: 201,
  PUT: 204
}
const errorCodes: any = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  FORBIDDEN: 403,
  INT_SRV_ERR: 500,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401
}
export class Handlers {
  public static dataHandler = (data: any, httpMethod: string): { code: number, data?: any } => {
    if (!data) {
      return Handlers.errorHandler(null, 'BAD_REQUEST')
    }
    if (Array.isArray(data)) {
      if (data.length) {
        return { code: httpMethodCodes[httpMethod], data }
      } else {
        return Handlers.errorHandler(null, 'NOT_FOUND')
      }
    } else if (typeof (data) === 'object') {
      if (Object.keys(data).length) {
        return { code: httpMethodCodes[httpMethod], data }
      } else {
        return Handlers.errorHandler(null, 'NOT_FOUND')
      }
    }
    return { code: httpMethodCodes[httpMethod], data }
  }

  public static errorHandler = (data: any, errorType: string): { code: number, data?: any } => {
    return { code: errorCodes[errorType], data }
  }
}

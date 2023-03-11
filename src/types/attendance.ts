import { BaseRequest, BaseResponse, Meta } from '@/types/common'

// same with the attribute on responses
export interface Attendance {
    type: string
    id: string
    staffId: string
    arrivalTime: string
    exitTime: string
  }

export type AttendanceBaseResponse = BaseResponse<Attendance>
export type AttendanceBaseRequest = BaseRequest<Attendance>
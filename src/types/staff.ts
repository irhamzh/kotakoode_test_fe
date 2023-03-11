import { BaseRequest, BaseResponse, Meta } from '@/types/common'

// same with the attribute on responses
export interface Staff {
  type: string
  id: string
  staffId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
  username: string
  latestAttendanceId: string
}

export interface StaffUpdate {
  id: string
  staffId: string
  firstName: string
  lastName: string
  email: string
  username: string
}

export type StaffBrowseRequest = {
  page: number
  pageSize: number
}

export type StaffBrowseResponse = BaseResponse<Staff>
export type StaffDetailResponse = BaseResponse<Staff>
export type StaffUpdateRequest = BaseRequest<StaffUpdate>

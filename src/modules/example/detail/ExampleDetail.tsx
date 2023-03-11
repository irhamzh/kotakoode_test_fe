import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Blank from '@/layouts/Blank'
import {
  useGetDetailStaffQuery,
  useGetListAttendancesQuery,
  useGetSelfUserQuery,
  usePostNewAttendanceMutation,
  usePutUpdateAttendanceMutation,
  usePutUpdateUserMutation,
} from '@/services/staffs'


const ExampleDetail: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'example'])

  const { data } = useGetDetailStaffQuery(String(router.query.id))

  const currentData = data?.data?.[0].attributes

  const { data: attendanceData } = useGetListAttendancesQuery(String(router.query.id))

  // To check whether currently opening own data
  // If it is, then show update forms and clock-in/clock-out
  const { data: selfData } = useGetSelfUserQuery("")
  const isSelf = selfData?.data[0].id == router.query.id
  
  const [firstName, setFirstName] = useState(currentData?.firstName);

  const [lastName, setLastName] = useState(currentData?.lastName);

  const [staffId, setStaffId] = useState(currentData?.staffId);

  const [email, setEmail] = useState(currentData?.email);

  const [username, setUsername] = useState(currentData?.username);

  const [doUpdate] = usePutUpdateUserMutation()

  const [doClockIn] = usePostNewAttendanceMutation()

  const [doClockOut] = usePutUpdateAttendanceMutation()

  const onFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e: any) => {
    setLastName(e.target.value);
  };

  const onStaffIdChange = (e: any) => {
    setStaffId(e.target.value);
  };

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const onSubmitUpdate = async (e: any) => {
    const payload = {
      data: {
        attributes: { 
          id: currentData?.id as string,
          firstName: (firstName || currentData?.firstName) as string,
          lastName: (lastName || currentData?.lastName) as string,
          staffId: (staffId || currentData?.staffId) as string,
          email: (email || currentData?.email) as string,
          username: (username || currentData?.username) as string,
        },
      },
    }

    await doUpdate(payload)
    refreshPage()
  };

  const onSubmitClockIn = async (e: any) => {
    await doClockIn(currentData?.id as string)
    refreshPage()
  }

  const onSubmitClockOut = async (e: any) => {
    await doClockOut(currentData?.id as string)
    refreshPage()
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <Blank title={data?.data?.[0]?.attributes?.firstName || 'Loading...'}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <h1 className='font-primary text-2xl font-bold md:text-4xl'>{data?.data?.[0]?.attributes?.firstName || 'Loading...'}</h1>

            <Language />
          </div>

          <div className='flex flex-row justify-center'>
            <Link href={{ pathname: '/examples', query: { lang: router.query.lang } }}>
              <a className='mt-6 py-2 px-4 text-sm font-medium underline'>
                {t('common:backTo', { page: t('common:titles.example') })}
              </a>
            </Link>
          </div>

          <div className='mt-6 grid w-full place-items-center'>
            <div className='group relative'>
              <div className='aspect-w-1 aspect-h-1 lg:aspect-none h-80 w-80 overflow-hidden rounded-md bg-gray-200 lg:h-80'>
                <img
                  src={`https://ui-avatars.com/api/?name=${currentData?.firstName}+${currentData?.lastName}&background=${isSelf ? "FF6242" : "0D8ABC"}&color=fff`}
                  alt={data?.data?.[0]?.attributes?.firstName}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                  loading='lazy'
                />
              </div>
              <div className='mt-6 text-center'>
                <h4 className='mt-6 py-2 px-10 text-lg font-bold'>{data?.data?.[0]?.attributes?.fullName || 'Loading...'}</h4>
                <p className='text-sm text-gray-700'>{`Staff ID: ${data?.data?.[0]?.attributes?.staffId}` || 'Loading...'}</p>
              </div>
            </div>
          </div>

          {isSelf && 
            <div>
              <div className='flex flex-row justify-center'>
                <h3 className='mt-6 text-lg font-bold'>
                Edit Data
                </h3>
              </div>
              <div className="grid gap-6 mt-3 mb-3 md:grid-cols-2 px-10">
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  First Name : 
                </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  type="text"
                  value={firstName || currentData?.firstName}
                  onChange={onFirstNameChange}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Last Name : 
                </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  type="text"
                  value={lastName || currentData?.lastName}
                  onChange={onLastNameChange}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Staff ID : 
                </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  type="text"
                  value={staffId || currentData?.staffId}
                  onChange={onStaffIdChange}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Email : 
                </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  type="text"
                  value={email || currentData?.email}
                  onChange={onEmailChange}
                />
              </div>
              <div>
                <label className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'>
                  Username : 
                </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  type="text"
                  value={username || currentData?.username}
                  onChange={onUsernameChange}
                />
              </div>
              <div className='flex justify-center'>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-9"
                  type="submit" 
                  onClick={onSubmitUpdate}
                  >
                    Submit
                </button>
              </div>
              </div>
            </div>
          }

          { attendanceData?.data.length != 0 && 
            <div className='justify-center'>
              <div className='flex flex-row justify-center'>
                <h3 className='mt-6 py-2 px-10 text-lg font-bold'>
                  Attendance List
                </h3>
              </div>
              {isSelf && 
              <div className='flex flex-row justify-center'>
                {currentData?.latestAttendanceId === null ? 
                  <button className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit" 
                    onClick={onSubmitClockIn}
                    >
                      Clock-in
                  </button>
                  :
                  <button className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                    type="submit" 
                    onClick={onSubmitClockOut}
                    >
                      Clock-out
                  </button>
                }
              </div>}
              <div className="flex flex-row justify-center">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead
                      className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                      <tr>
                        <th scope="col" className="px-6 py-4">Date</th>
                        <th scope="col" className="px-6 py-4">Arrival Time</th>
                        <th scope="col" className="px-6 py-4">Exit Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData?.data.map(element => {
                        let date = new Date(element.attributes.arrivalTime).toISOString().split('T')[0];
                        let arrivalTime = new Date(element.attributes.arrivalTime);
                        let arrivalTimeHoursMin = arrivalTime.getHours() + ':' + arrivalTime.getMinutes();

                        let exitTime = new Date(element.attributes.exitTime);
                        let exitTimeHoursMin = exitTime.getFullYear() === 1970 ? "-" : exitTime.getHours() + ':' + exitTime.getMinutes();

                      return <>
                        <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                          <td className="whitespace-nowrap px-6 py-4">{date}</td>
                          <td className="whitespace-nowrap px-6 py-4">{arrivalTimeHoursMin}</td>
                          <td className="whitespace-nowrap px-6 py-4">{exitTimeHoursMin}</td>
                        </tr>
                      </>
                      })} 
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }
        </section>
      </main>
    </Blank>
  )
}

export default ExampleDetail

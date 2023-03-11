import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Blank from '@/layouts/Blank'
import { usePostLogoutMutation } from '@/services/auth'
import { USER_ACCESS_TOKEN } from '@/config/token'
import { deleteCookie, getCookie, getCookies, setCookie } from 'cookies-next'

const Home: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'home'])

  //Logout implementation
  const [ doLogout, { isSuccess, data } ] = usePostLogoutMutation()

  const onSubmitLogout =async (e:any) => {
    await doLogout(e) 
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.data[0].attributes.message! === "Logout successfully") {
        deleteCookie(USER_ACCESS_TOKEN)
      }

      router.push('/login')
    }
  })

  return (
    <Blank title={t('home:title')}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <h1 className='font-primary text-2xl font-bold md:text-4xl'>{t('common:titles.home')}</h1>

            <Language />
          </div>

          <div className='flex flex-row justify-center'>
            <Link
              href={{ pathname: '/examples', query: { lang: router.query.lang } }}
              locale={router.locale}
            >
              <a className='mt-6 py-2 px-4 text-sm font-medium underline'>{t('home:example')}</a>
            </Link>
          </div>
          <div className='flex flex-row justify-center'>
            <button className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
              type="submit" 
              onClick={onSubmitLogout}
              >
                Log Out
            </button>
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default Home

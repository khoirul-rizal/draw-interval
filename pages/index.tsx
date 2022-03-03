import type { NextPage } from 'next'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import MainPage from '../components/MainPage'

const Index: NextPage = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans, sans serif',
        colorScheme: 'dark',
      }}
    >
      <NotificationsProvider>
        <MainPage />
      </NotificationsProvider>
    </MantineProvider>
  )
}
export default Index

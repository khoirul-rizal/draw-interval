import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Container, Image, Box, Button, Modal } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'

// let timer: number = 0
// let imageURLs: string[] = JSON.parse(sessionStorage.getItem('state') || '')
// let curImageURL: string = ''

const Activity: NextPage = () => {
  const {height, width} = useViewportSize()
  const imageBase: string[] = JSON.parse(sessionStorage.getItem('state') || '') || []
  const timerBase: string = sessionStorage.getItem('timer') || ''
  const [isOpen, setIsOpen]= useState<boolean>(false) 
  const [imageURLs, setImageURL]= useState<string[]>([]) 
  const [timer, setTimer] = useState<number>(0)
  const [curImageURL, setCurImageURL] = useState<string>('')

  const ShowRetry = () => {
    setIsOpen(true)
  }

  const RestartDraw = async() => {
    setImageURL(imageBase)
    setIsOpen(false)
  }

  const timeListener = () => {
      if (timer <= 0) {
        console.log(imageURLs.length)
        if(imageURLs.length == 0) {
          if (curImageURL == '') RestartDraw()
          else ShowRetry()
        } else {
          setTimer(parseInt(timerBase))
          const image: string[] = imageURLs
          const splicedImg: string = image.splice(Math.floor(Math.random() * image.length), 1)[0]
          setCurImageURL(splicedImg)
        }
      } else {
        const myTime = timer - 1
        setTimer(myTime)
      }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      timeListener()
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, imageURLs])

  return (
    <Container
      sx={theme => ({
        margin: theme.spacing.md
      })}>
      <Head>
        <title>Focus Draw</title>
        <meta name="description" content="Perfection is enemy of progress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal 
        centered
        opened={isOpen}
        onClose={() => {setIsOpen(false)}}
        style={{textAlign: 'center'}}
        hideCloseButton>
          <Box sx={theme => ({
            fontSize:  theme.fontSizes.xl,
            padding: theme.spacing.md,
          })}>
            Retry?
          </Box>
          <Box>
            <Button style={{margin: 10}}  onClick={RestartDraw}>Yes</Button>
            <Link href='/'><Button variant='outline'>No, back to image list</Button></Link>
          </Box>
      </Modal>
      <Box 
          sx = {theme => ({
            padding: theme.spacing.md,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.md,
            backgroundColor: theme.colors.dark[3],
            textAlign: "center",
            right: 0
          })} >
            Timer || {timer}
      <Link href='/' as='/'><Button>Back</Button></Link>
      </Box>
      <Box sx={theme => ({
        textAlign: "center",
        margin: "auto",
        backgroundColor: theme.colors.dark[3],
      })}>
        <Image
          sx={theme => ({
            width: width - 100,
            '@media (min-width: 700px)' : {
              width: 600
            }
          })}
          radius="md"
          src={curImageURL} />
      </Box>
    </Container>
  )
}

export default Activity

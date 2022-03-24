import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Container, Image, Box, Button, Modal } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'

const Activity: NextPage = () => {
  const { height, width } = useViewportSize()
  const imageBase: string[] = JSON.parse(sessionStorage.getItem('state') || '') || []
  const timerBase: string = sessionStorage.getItem('timer') || ''
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [imageURLs, setImageURL] = useState<string[]>([])
  const [timer, setTimer] = useState<number>(0)
  const [curImageURL, setCurImageURL] = useState<string>('')

  const ShowRetry = () => {
    setIsOpen(true)
  }

  const RestartDraw = async () => {
    setImageURL(imageBase)
    setIsOpen(false)
  }

  const timeListener = () => {
    if (timer <= 0) {
      console.log(imageURLs.length)
      if (imageURLs.length == 0) {
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
  const pad = (num:number) => {
    if (num > 9) return num.toString()
    else return `0${num}`
  }
  const timerToText = (timer:number) => {
    let min:number = 0;
    let sec:number = 0;
    if (Math.floor(timer / 60) > 0) min = timer / 60 
    sec = timer - (min * 60)
    //return sec
    return `${pad(min)}:${pad(sec)}`
  }
  useEffect(() => {
    const interval = setInterval(() => {
      timeListener()
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, imageURLs])

  return (
    <Box
      sx={ theme => ({backgroundColor: theme.colors.dark[9]})}
      style={{ height:"100vh", textAlign: 'center', margin: 'auto' }}
    >
      <Head>
        <title>Focus Draw</title>
        <meta name="description" content="Perfection is enemy of progress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        centered
        opened={isOpen}
        onClose={() => { setIsOpen(false) }}
        style={{ textAlign: 'center' }}
        hideCloseButton>
        <Box sx={theme => ({
          fontSize: theme.fontSizes.xl,
          padding: theme.spacing.md,
        })}>
          Retry?
        </Box>
        <Box>
          <Button style={{ margin: 10 }} onClick={RestartDraw}>Yes</Button>
          <Link href='/'><Button variant='outline'>No, back to image list</Button></Link>
        </Box>
      </Modal>
      <Box style={{position: "absolute", right:5}}><Link href='/' as='/'><Button variant='subtle' color="gray">X</Button></Link></Box>
      <Box
        sx={theme => ({
          padding: theme.spacing.md,
          textAlign: "center",
          right: 0,
          fontSize: "3rem",
          backgroundColor: theme.colors.dark[7],
          color:'white'
        })} >
        {timerToText(timer)}
      </Box>
      <Box sx={theme => ({
        textAlign: "center",
        margin: "auto",
        padding: theme.spacing.md,
      })}>
        <Image
          sx={theme => ({
            width: width - 100,
            maxHeight: "100%",
            '@media (min-width: 700px)': {
              width: 600
            }
          })}
          style={{ margin: 'auto' }}
          radius="md"
          src={curImageURL} />
      </Box>
    </Box>
  )
}

export default Activity

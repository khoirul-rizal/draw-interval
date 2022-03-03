import type { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '@mantine/core'
import ImageListContainer from './ImageListContainer'
import TimerOptions from './TimerOptions'
import { useEffect, useState } from 'react'
import { useNotifications } from '@mantine/notifications'

const MainPage: NextPage = () => {

  const notifications = useNotifications()
  const [imageURLs, setImageURL] = useState<string[]>([])
  useEffect(() => {
    if (!imageURLs.length && sessionStorage.getItem('state') && JSON.parse(sessionStorage.getItem('state') || '[]')?.length) {
      setImageURL(JSON.parse(sessionStorage.getItem('state') || '') || [])
    }
  }, [imageURLs])
  const SaveFile = () => {
    const a = document.createElement('a');
    const blob = new Blob([JSON.stringify(imageURLs, null, 2)], { type: 'application/json' })
    a.download = 'my-file.txt';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  const showFile = async () => {
    const a = document.createElement('input')
    a.type = 'file'
    a.onchange = (e: any) => { ReadFile(e) }
    a.addEventListener('click', (e) => {
      setTimeout(() => { }, 30 * 1000);
    });
    a.click();
  }

  const ReadFile = (e: any) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = JSON.parse((e.target.result))
      AddImage(text)
    };
    reader.readAsText(e.target.files[0])
  }

  const ResetImage = () => {
    setImageURL([])
    sessionStorage.setItem('state', '[]');
  }

  const SetTimer = (timer: string) => {
    sessionStorage.setItem('timer', timer);
  }

  const DropListener = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const src: string = e.dataTransfer.getData('text/html')
    console.log(src)
    if (src.split('class').length === 0) return

    let imgURL: string = ''
    if (src.split('srcset')[1]) {
      const splittedImgURL: string[] = src.split('srcset')[1].split('"')[1].split(' ')
      imgURL = splittedImgURL[splittedImgURL.length - 2]
    } else if (src.split('src')[1].split('"')[1]) {
      imgURL = src.split('src')[1].split('"')[1]
    }
    AddImage([imgURL])
  }
  const DragOverListener = (e: any) => {
    e.preventDefault()
  }

  const AddImage = (newImageList: string[]) => {
    newImageList = [...imageURLs, ...newImageList]
    if (DuplicateCheck(newImageList)) {
      notifications.showNotification({
        title: 'Oops. Duplicated Image',
        message: 'You have duplicate image, we already reduce it automaticly',
        color: 'red'
      })
      newImageList = newImageList.filter(DuplicateReducer)
      console.log('newImageList', newImageList)
    }
    if (newImageList.length !== 0) {
      sessionStorage.setItem('state', JSON.stringify(newImageList));
      setImageURL(newImageList)
    }
  }



  const DuplicateReducer = (value: string, index: number, self: string[]) => {
    return self.indexOf(value) === index
  }
  const DuplicateCheck = (arr: string[]) => {
    return new Set(arr).size !== arr.length
  }


  return (
    <Container
      sx={theme => ({
        backgroundColor: theme.colors.dark[8],
      })}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TimerOptions
        imageURLs={imageURLs}
        SetTimer={SetTimer}
        SaveFile={SaveFile}
        ResetImage={ResetImage}
        showFile={showFile} />
      <ImageListContainer DropListener={DropListener}
        DragOverListener={DragOverListener}
        imageURLs={imageURLs}
        setImageURL={setImageURL} />
    </Container>
  )
}

export default MainPage
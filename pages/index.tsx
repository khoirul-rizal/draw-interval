import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { MantineProvider, Button, Container, Box, Image, Grid, ScrollArea, MediaQuery, SimpleGrid, Overlay, CloseButton } from '@mantine/core'

  /*TODO
  []. SOP or REGEX listening SRC IMAGE
  [X]. Delete Image
  []. Duplicate Image
  [x]. Input Auto Next
  []. Empty Image
    */

const DragOverListener = (e: any) => {
  e.preventDefault()
}
const Index: NextPage = () => {
  return (
    <MantineProvider
    theme={{
      fontFamily: 'Open Sans, sans serif',
      colorScheme: 'dark',
      }}
     >
      <App />
    </MantineProvider>
  )
}
const App: NextPage = () => {
  const [imageURLs, setImageURL] = useState<string[]>([])
  const DropListener = (e: any) => {
    e.stopPropagation();
    e.preventDefault(); 
    const src: string = e.dataTransfer.getData('text/html')
    if(src.split('class').length === 0) return

    let imgURL: string = ''
    imgURL = src.split('srcset')[1].split('"')[1].split(' ')[6]
    sessionStorage.setItem('state', JSON.stringify([...imageURLs, imgURL]));
    setImageURL([...imageURLs, imgURL])
  }

  useEffect(() => {
    console.log(sessionStorage.getItem('state'))
    if (!imageURLs.length && sessionStorage.getItem('state') && !sessionStorage.getItem('state')?.length) {
      setImageURL(JSON.parse(sessionStorage.getItem('state') || '') || [])
    } 
  }, [imageURLs])

  const SetTimer = (timer: string) => {
    sessionStorage.setItem('timer', timer);
  }

  const SaveFile = () => {
    const a = document.createElement('a');
    const blob = new Blob([JSON.stringify(imageURLs, null, 2)], {type: 'application/json'})
    a.download = 'my-file.txt';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  const showFile = async () => {
    alert('a')
    const a = document.createElement('input')
    a.type = 'file'
    a.onchange = (e:any) => { ReadFile(e) }
    a.addEventListener('click', (e) => {
      setTimeout(() => {}, 30 * 1000);
    });
    a.click();
  }
  const ReadFile = (e:any) => {
      e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = JSON.parse((e.target.result))
      setImageURL([...imageURLs, ...text])
    };
    reader.readAsText(e.target.files[0])
  }

  const ResetImage = () => {
    setImageURL([])
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
       <Container 
        >
         <div>
          Timer
          <Link href="/activity"><Button disabled={imageURLs.length === 0} onClick={() => SetTimer('20')} variant="outline" style={{ margin: 10 }}>20 Seconds</Button></Link>
          <Link href="/activity"><Button disabled={imageURLs.length === 0} onClick={() => SetTimer('60')} variant="outline" style={{ margin: 10 }}>60 Seconds</Button></Link>
          <Link href="/activity"><Button disabled={imageURLs.length === 0} onClick={() => SetTimer('150')} variant="outline" style={{ margin: 10 }}>150 Seconds</Button></Link>
         </div>
         <div>
          <Button onClick={() => showFile()} variant="outline" style={{ margin: 10 }}>Load Image</Button>
          <Button disabled={imageURLs.length === 0} onClick={() => SaveFile()} variant="outline" style={{ margin: 10 }}>Save Image</Button>
          <Button disabled={imageURLs.length === 0} onClick={() => ResetImage()} variant="outline" style={{ margin: 10 }}>Reset Image</Button>
         </div>
        <Box
          sx = {theme => ({
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
            marginTop: theme.spacing.md,
            backgroundColor: theme.colors.dark[3]
          })}
          onDrop={DropListener}
          onDragOver={DragOverListener} 
          className={styles.drag__container}>
          <div className={styles.drag__title}>Drop Your Image Here</div>
          <ScrollArea
            style={{height: "70vh"}} >
            <SimpleGrid
              cols={4}
              breakpoints={[
                {maxWidth: "md", cols:3, spacing:'md'},
                {maxWidth: "sm", cols:2, spacing:'md'},
                {maxWidth: "xs", cols:1, spacing:'md'},
              ]}
              >
                {
                  imageURLs.map((url, index) => {
                    return (
                      <div key={index} style={{margin: "auto", height:"100%", position:'relative'}}>
                        <CloseButton 
                          onClick={() => {
                            const image: string[] = imageURLs
                            image.splice(index, 1)
                            console.log(image)
                            sessionStorage.setItem('state', JSON.stringify([...image]));
                            setImageURL([...image])
                            this
                          }}
                          color="gray"
                          style={{zIndex:3, position:'absolute', right:0, opacity:0.3}} />
                        <Image 
                          radius="md"
                          style={{margin: "auto"}}
                          width={200}
                          src={url}
                           />
                      </div>
                    )
                  })
                }
            </SimpleGrid>
          </ScrollArea>
        </Box>
      </Container> 
    </Container>
  )
}

export default Index

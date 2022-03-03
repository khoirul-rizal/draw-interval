import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Box, Image, ScrollArea, SimpleGrid, CloseButton } from '@mantine/core'
import { useNotifications, NotificationsProvider } from '@mantine/notifications'

type DropListener = (a: any) => void
type DragOverListener = (a: any) => void
type setImageURL = (a: string[]) => void

interface Props {
  DropListener: DropListener,
  DragOverListener: DragOverListener,
  imageURLs: string[],
  setImageURL: setImageURL
}

const ImageListContainer = ({ DropListener, DragOverListener, imageURLs, setImageURL }: Props) => {
  return (
    <Box
      sx={theme => ({
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
        style={{ height: "70vh" }} >
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: 'md' },
            { maxWidth: "sm", cols: 2, spacing: 'md' },
            { maxWidth: "xs", cols: 1, spacing: 'md' },
          ]}
        >
          {
            imageURLs.map((url, index) => {
              return (
                <div key={index} style={{ margin: "auto", height: "100%", position: 'relative' }}>
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
                    style={{ zIndex: 3, position: 'absolute', right: 0, opacity: 0.3 }} />
                  <Image
                    radius="md"
                    style={{ margin: "auto" }}
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
  )
}

export default ImageListContainer
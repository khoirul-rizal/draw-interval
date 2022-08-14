import { Box, Image, ScrollArea, SimpleGrid, CloseButton } from '@mantine/core'
import { DragEventHandler } from 'react'

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
        backgroundColor: theme.colors.dark[5],
        margin: "auto",
        color: "white"
      })}
      style={{ width: '90%' }}
      onDrop={DropListener}
      onDragOver={DragOverListener} >
      <Box
         style={{fontSize: "3rem", marginBottom:10, textAlign:"center", }}
       >
         Drop Your Image Here
      </Box>
      <ScrollArea
        style={{ height: "80vh", margin:"10px" }} >
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
                <div key={url} style={{ margin: "auto", height: "100%", position: 'relative' }}>
                  <CloseButton
                    onClick={() => {
                      const image: string[] = imageURLs
                      image.splice(index, 1)
                      console.log(image)
                      sessionStorage.setItem('state', JSON.stringify([...image]));
                      setImageURL([...image])
                      this
                    }}
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
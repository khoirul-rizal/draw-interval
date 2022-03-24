import { NextPage } from "next";
import Link from 'next/link'
import { Box, Button, Container } from '@mantine/core'

type SaveFile = () => void
type SetTimer = (a: string) => void
type ResetImage = () => void
type showFile = () => void
interface Props {
  imageURLs: string[],
  SetTimer: SetTimer,
  SaveFile: SaveFile,
  ResetImage: ResetImage,
  showFile: showFile
}

const TimerOptions = ({ imageURLs, SetTimer, SaveFile, ResetImage, showFile }: Props) => {
  return (
    <Container
      sx={theme => ({
        backgroundColor: theme.colors.dark[6],
        padding: 10,
        borderRadius: theme.radius.md,
        color: "white",
        margin: 'auto',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      })} >
      <Box style={{display: 'flex', justifyContent: 'space-around'}}>
        <div>
          <div> Timer </div>
          <Link href="/activity"><Button disabled={imageURLs.length === 0} onClick={() => SetTimer('20')} variant="outline" style={{ margin: 10 }}>20 Seconds</Button></Link>
          <Link href="/activity"><Button disabled={imageURLs.length === 0} onClick={() => SetTimer('60')} variant="outline" style={{ margin: 10 }}>60 Seconds</Button></Link>
          <Link href="/activity"><Button disabled={imageURLs.length === 0} onClick={() => SetTimer('150')} variant="outline" style={{ margin: 10 }}>150 Seconds</Button></Link>
          <Link href="/activity"><Button disabled={imageURLs.length === 0} onClick={() => SetTimer('180')} variant="outline" style={{ margin: 10 }}>180 Seconds</Button></Link>
        </div>
        <div>
          <div> Options </div>
          <Button onClick={() => showFile()} variant="outline" style={{ margin: 10 }}>Load Image</Button>
          <Button disabled={imageURLs.length === 0} onClick={() => SaveFile()} variant="outline" style={{ margin: 10 }}>Save Image</Button>
          <Button disabled={imageURLs.length === 0} onClick={() => ResetImage()} variant="outline" style={{ margin: 10 }}>Reset Image</Button>
        </div>
      </Box>
    </Container>
  )
}

export default TimerOptions
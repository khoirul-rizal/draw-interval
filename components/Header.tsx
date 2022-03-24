import { Box, Button, Grid } from '@mantine/core'

const Header = () => {
  return (
    <Box sx={theme => ({
      backgroundColor: theme.colors.dark[7],
      padding: theme.spacing.sm,
    })}>
      <Button 
        sx={theme => ({
          fontSize: '1.3rem'
        })}
        style={{marginRight: '10px'}}>
         Home </Button>
      <Button
        sx={theme => ({
          backgroundColor: theme.colors.gray[6]
        })}
        style={{marginRight: '10px'}}> How It Work </Button>
      <Button
        sx={theme => ({
          backgroundColor: theme.colors.gray[6]
        })}
        style={{marginRight: '10px'}}> About </Button>
    </Box>
  )
}

export default Header
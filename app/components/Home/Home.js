import React from 'react'
import { Grid, Statistic, Image } from 'semantic-ui-react'

export default function Home (props) {
  return (
    <div className='login-form'>
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.container,
      body > div > div > div.container > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid textAlign='center'
        style={{ height: '85%' }}
        verticalAlign='middle'>
        <Grid.Column textAlign='center'>
          <Image src={require('../../assets/images/crt425.png')} style={{maxWidth: 200}} centered={true}/>
          <Statistic>
            <Statistic.Value>Xialiao</Statistic.Value>
            <Statistic.Label>瞎聊 / 瞎看 / 瞎玩</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid>
    </div>
  )
}

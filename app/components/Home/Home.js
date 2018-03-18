import React from 'react'
import { Grid, Statistic, Image } from 'semantic-ui-react'
import {logoPath} from 'helpers/images'

export default function Home (props) {
  return (
    <div className='login-form'>
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid textAlign='center'
        style={{ height: '85%' }}
        verticalAlign='middle'>
        <Grid.Column textAlign='center'>
          <Image src={logoPath} style={{maxWidth: 200}} centered={true}/>
          <Statistic>
            <Statistic.Value>Xialiao</Statistic.Value>
            <Statistic.Label>瞎聊 / 瞎看 / 瞎玩</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid>
    </div>
  )
}

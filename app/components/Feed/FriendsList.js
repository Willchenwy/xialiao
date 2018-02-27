import React from 'react'
import { Image, List, Divider } from 'semantic-ui-react'

const ListExampleAnimated = () => (
  <List selection={true} verticalAlign='middle' floated='right'>
    <List.Item>
      <List.Header style={{paddingBottom: '15px'}}>FRIENDS</List.Header>
      <Divider fitted />
    </List.Item>
    <List.Item>
      <Image avatar={true} src={require('../../assets/images/avatar/small/helen.jpg')} />
      <List.Content>
        <List.Header>Helen</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar={true} src={require('../../assets/images/avatar/small/christian.jpg')} />
      <List.Content>
        <List.Header>Christian</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar={true} src={require('../../assets/images/avatar/small/daniel.jpg')} />
      <List.Content>
        <List.Header>Daniel</List.Header>
      </List.Content>
    </List.Item>
  </List>
)

export default ListExampleAnimated

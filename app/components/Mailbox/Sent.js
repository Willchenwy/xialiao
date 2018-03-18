// import React from 'react'
// import PropTypes from 'prop-types'
// import { Menu, Dimmer, Loader, Image as ImageComponent, Segment, Feed, Card, Grid, Header } from 'semantic-ui-react'
// import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
// import {paragraph} from 'helpers/images'

// const RecieverAbstract = ({message}) => (
//   <Feed>
//     <Feed.Event>
//       <Feed.Label image={message.senderAvatar} />
//       <Feed.Content>
//         <Feed.Summary>{message.receiverName}</Feed.Summary>
//         <Feed.Extra>
//           {message.text.length < 15
//             ? message.text
//             : `${message.text.substring(0, 15)}...`}
//         </Feed.Extra>
//       </Feed.Content>
//     </Feed.Event>
//   </Feed>
// )

// const MessageDetail = ({message}) => (
//   <Card raised={true} fluid={true}>
//     <Card.Content>
//       <Card.Meta textAlign='right'>3 days ago</Card.Meta>
//       <Card.Header>{message.subject}</Card.Header>
//       <Card.Meta>To {message.receiverName}</Card.Meta>
//       <Card.Description><pre style={{whiteSpace: 'pre-wrap', fontFamily: 'Lato'}}>{message.text}</pre></Card.Description>
//     </Card.Content>
//   </Card>
// )

// function Sent ({isFetchingSent, sentMessageIds, messages}) {
//   return (
//     isFetchingSent === true
//       ? <Segment>
//         <Dimmer active={true} inverted={true}>
//           <Loader size='large'>Loading</Loader>
//         </Dimmer>
//         <ImageComponent src={paragraph} />
//       </Segment>
//       : <Grid>
//         {sentMessageIds.length === 0
//           ? <Segment basic={true}><Header as='h5' disabled={true} textAlign='center'>No Messaeg</Header></Segment>
//           : <Grid.Row>
//             <Grid.Column width={5}>
//               <Menu secondary={true} vertical={true}>
//                 {sentMessageIds.map(
//                   id =>
//                     <Menu.Item
//                       key={id}
//                       as={NavLink}
//                       to={`${match.url}/${id}`}
//                       content={<RecieverAbstract message={messages[id]} key={id}/>}
//                       style={{padding: '4px', maxheight: '65px'}}/>
//                 )}
//               </Menu>
//             </Grid.Column>
//             <Grid.Column width={11}>
//               <Switch>
//                 {sentMessageIds.map(
//                   id =>
//                     <Route
//                       key={id}
//                       path={`${match.path}/${id}`}
//                       render={
//                         props =>
//                           <MessageDetail message={messages[id]} />
//                       } />
//                 )}
//                 <Redirect exact={true} from={`${match.path}`} to={`${match.url}/${sentMessageIds[0]}`}/>
//               </Switch>
//             </Grid.Column>
//           </Grid.Row>}
//       </Grid>
//   )
// }
// Sent.propTypes = {
//   isFetchingSent: PropTypes.bool.isRequired,
//   sentMessageIds: PropTypes.array.isRequired,
//   messages: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
// }

// export default Sent

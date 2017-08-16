// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text,
  Table,
  TableRow,
  TableItem,
  TableHeaderItem
} from "spectacle";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _icon = require("../icon");

var Icon = _interopRequireDefault(_icon).default;

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  openId: require("../assets/OpenId.png"),
  oauth: require("../assets/oauth.png"),
  tls: require("../assets/TLS.png"),
  https: require("../assets/HTTPS.jpg"),
  firesheep: require("../assets/firesheep.png"),
  wireshark: require("../assets/Wireshark_icon.svg.png"),
  wifipineapple: require("../assets/wifipineapple_logo_small.png"),
  MitMA: require("../assets/MitMA.png"),
  identityServer: require("../assets/identityServer.jpg"),
  jollyroger: require("../assets/jollyroger.gif"),
  unknownUser: require("../assets/unknownUser.png"),
  letsEncrypt: require("../assets/letsencrypt-logo-horizontal.svg"),
  logo: require("../assets/SRS_roundel_black.svg"),
};

preloader(images);

const primary = "#f16220"; //ff4081
const userColor = "#ff9f42";
const cloudColor = "#ffef42";
const serverColor = "#42ffe2";

const theme = createTheme({
  primary
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} fit caps lineHeight={1} textColor="black">
              Security
            </Heading>
            <Image src={images.logo} height="100px" width="auto" />
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary" >
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Use Cases
            </Heading>
            <List>
              <Appear><ListItem>Internal: How do we provide security to ourselves <Icon className="fa fa-cog" /></ListItem></Appear>
              <Appear><ListItem>External: How do we integrate with others securely <Icon className="fa fa-cogs" /></ListItem></Appear>
              <Appear><ListItem>Central security authority <Icon className="fa fa-bank" /></ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Terms
            </Heading>
            <List>
              <Appear><ListItem>Authentication - Who are you? <Icon className="fa fa-user-secret" /> </ListItem></Appear>
              <Appear><ListItem>Authorization - What can you do? <Icon className="fa fa-key" /></ListItem></Appear>
              <Appear><ListItem>Encryption - Is the connection secure? <Icon className="fa fa-lock" /></ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Authentication <Icon className="fa fa-user-secret" />
            </Heading>
            <Heading size={3} textColor="white">
              Who are you?
            </Heading>
            <List>
              <Appear><ListItem>Are you my user?</ListItem></Appear>
              <Appear><ListItem>Are you an external user from a trusted source? (Single Sign On)</ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Illustrated <Icon className="fa fa-user-secret" />
            </Heading>
            <Heading size={4} textColor="white">
              Single Sign On
            </Heading>
            <Layout>
              <Fill>
                <Text textSize="2.5em" textColor={userColor}><Icon className="fa fa-user" /></Text>
              </Fill>
              <Fill>
                <Text textSize="2.5em" textColor="#ffef42"><Icon className="fa fa-cloud" /></Text>
              </Fill>
              <Fill>
                <Text textSize="2.5em" textColor="#42ffe2"><Icon className="fa fa-bank" /></Text>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor={userColor}>May I join your club? Here's my <Icon className="fa fa-book" /></Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#ffef42">Hm, let me check with club-central.</Text></Appear>
              </Fill>
              <Fill>

              </Fill>
            </Layout>
            <Layout>
              <Fill>

              </Fill>
              <Fill>
                <Appear><Text textColor="#ffef42">Do you recognize this <Icon className="fa fa-book" />?</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#42ffe2">Yeah, that's Alex from Intelichart. We trust those people.</Text></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
              </Fill>
              <Fill>
                <Appear><Text textColor="#ffef42">Ok Mr. Cardona, you're registered.</Text></Appear>
              </Fill>
              <Fill>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor={userColor}>Thanks!</Text></Appear>
              </Fill>
              <Fill>
              </Fill>
              <Fill>
              </Fill>
            </Layout>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Solution <Icon className="fa fa-user-secret" />
            </Heading>
            <Appear><Image src={images.openId} height="auto" width="100%"  /></Appear>
            <List>
              <Appear><ListItem>Industry <b>standard</b> protocol for sharing user information</ListItem></Appear>
              <Appear><ListItem>Allows partners to integrate without adopting a proprietary protocol</ListItem></Appear>
              <Appear><ListItem>Allows users to be sourced and authenticated from external systems</ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Authorization <Icon className="fa fa-key" />
            </Heading>
            <Heading size={3} textColor="white">
            What can you do?
            </Heading>
            <List>
              <Appear><ListItem>Grants or denies access to resources (SRSAPI)</ListItem></Appear>
              <Appear><ListItem>Grants or denies access to actions within resources (Specific API requests)</ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Illustrated <Icon className="fa fa-key" />
            </Heading>
            <Layout>
              <Fill>
                <Text textSize="2.5em" textColor={userColor}><Icon className="fa fa-user" /></Text>
              </Fill>
              <Fill>
                <Text textSize="2.5em" textColor="#ffef42"><Icon className="fa fa-cloud" /></Text>
              </Fill>
              <Fill>
                <Text textSize="2.5em" textColor="#42ffe2"><Icon className="fa fa-bank" /></Text>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor={userColor}>I've got this <Icon className="fa fa-key" />. May I see patient #12345?</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#ffef42">Let me check that</Text></Appear>
              </Fill>
              <Fill>

              </Fill>
            </Layout>
            <Layout>
              <Fill>

              </Fill>
              <Fill>
                <Appear><Text textColor="#ffef42">Do you recognize this <Icon className="fa fa-key" />?</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#42ffe2">Yep, he can access that patient</Text></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
              </Fill>
              <Fill>
                <Appear><Text textColor="#ffef42">Ok Mr. Cardona, here's patient #12345</Text></Appear>
              </Fill>
              <Fill>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor={userColor}>Thanks!</Text></Appear>
              </Fill>
              <Fill>
              </Fill>
              <Fill>
              </Fill>
            </Layout>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Solution <Icon className="fa fa-key" />
            </Heading>
            <Appear><Image src={images.oauth} height="200px" width="auto" /></Appear>
            <List>
              <Appear><ListItem>Industry <b>standard</b> protocol for issuing and validating access keys</ListItem></Appear>
              <Appear><ListItem>Allows partners to integrate without adopting a proprietary protocol</ListItem></Appear>
              <Appear><ListItem>Allows access to be taylored to specific use cases</ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Encryption <Icon className="fa fa-lock" />
            </Heading>
            <Heading size={3} textColor="white">
              Is the connection secure?
            </Heading>
            <List>
              <Appear><ListItem>HTTP</ListItem></Appear>
              <Appear><ListItem>SQL Server</ListItem></Appear>
              <Appear><ListItem>Rabbit MQ</ListItem></Appear>
              <Appear><ListItem>UNC File I/O</ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Illustrated <Icon className="fa fa-lock" />
            </Heading>
            <Appear><Image src={images.MitMA} height="auto" width="100%" /></Appear>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Famous Examples <Image src={images.jollyroger} margin="0px auto 40px" height="100px"/>
            </Heading>
            <List>
              <Appear>
                <ListItem>
                  <Image src={images.firesheep} margin="0 10px 0 0" height="75px"/>
                  <a href="https://codebutler.github.io/firesheep/">Firesheep</a> - account hijacking (Free: Novice)
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Image src={images.wifipineapple} margin="0 10px 0 0" height="75px"/>
                  <a href="https://www.wifipineapple.com/">WiFi Pineapple</a> - Instant <a href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">MitMA</a> ($99: Medium)
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Image src={images.wireshark} margin="0 10px 0 0" height="75px"/>
                  <a href="https://www.wireshark.org/">Wire Shark</a> - read network traffic (Free: Advanced)
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <a href="http://www.softwaretestinghelp.com/penetration-testing-tools/">And thousands more</a>
                </ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Solution <Icon className="fa fa-lock" />
            </Heading>
            <Layout>
              <Fill>
                <Appear><Image src={images.tls} height="auto" width="100%" /></Appear>
              </Fill>
              <Fill>
                <Appear><Image src={images.https} height="auto" width="100%" /></Appear>
              </Fill>
            </Layout>
            <List>
              <Appear><ListItem>TLS 1.2 is the industry standard protocol for encrypting communication on the network <i>(TLS 1.3 in draft)</i></ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              How?
            </Heading>
            <Layout>
              <Fill>
                <Text textSize="2.5em" textColor={primary}><Icon className="fa fa-user-secret" /> <Icon className="fa fa-key" /></Text>
              </Fill>
              <Fill>
                <Text textSize="2.5em" textColor={primary}><Icon className="fa fa-lock" /></Text>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><a href="https://identityserver.github.io/Documentation/"><Image src={images.identityServer}  height="auto" width="100%" /></a></Appear>
              </Fill>
              <Fill>
                <Appear><a href="https://letsencrypt.org/"><Image src={images.letsEncrypt}  height="auto" width="100%" /></a></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor={primary}>OpenId and OAuth certified</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor={primary}>TLS Certificate Authority</Text></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor={primary}>Sponsored by .Net Foundation</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor={primary}>Sponsored by CISCO, <Icon className="fa fa-facebook-square" />, etc...</Text></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor="#61ff42">100% Free | <a href="https://github.com/IdentityServer/IdentityServer3/blob/master/LICENSE">Apache2 License</a> <Icon className="fa fa-thumbs-up" /></Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#61ff42">100% Free</Text></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>

              </Fill>
              <Fill>
                <Appear><Text textColor={primary}>Hands off, auto renewing</Text></Appear>
              </Fill>
            </Layout>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              DEMO
            </Heading>
            <iframe ref={(c) => this.frame = c} src="http://anywhere.srssoft.com/SRSUI/Mobile/appregistration" style={{height:'100%',width:'100%'}} />
            <button
              type="button"
              onClick={() => {
                            this.frame.src = "http://anywhere.srssoft.com/SRSUI/Mobile/appregistration";
              }}
            >
              Generate Access Token
            </button>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary" >
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Questions For You <Icon className="fa fa-question-circle-o" />
            </Heading>
            <List>
              <Appear><ListItem>Who should have the power to issue access tokens? SRS or the Client?</ListItem></Appear>
            </List>
          </Slide>
          <Slide align="flex-start" transition={["fade"]} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Progress <Icon className="fa fa-line-chart" />
            </Heading>
            <Table>
              <TableRow>
                <TableHeaderItem>Milestone</TableHeaderItem>
                <TableHeaderItem>Date</TableHeaderItem>
              </TableRow>
              <Appear>
                <TableRow>
                  <TableItem>API Standard Created</TableItem>
                  <TableItem>12/1/2015</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>Identity Server R&D Started</TableItem>
                  <TableItem>5/1/2016</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>LetsEncrypt TLS Cert Successfully Tested</TableItem>
                  <TableItem>5/12/2016</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>Identity Server In the Build (not integrated)</TableItem>
                  <TableItem>6/30/2016</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>Initial API Offering (CNC)</TableItem>
                  <TableItem>7/15/2016</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>NEA1 Release</TableItem>
                  <TableItem>TBD</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>Identity Server Integrated (SRSAPI)</TableItem>
                  <TableItem>~11/30/2016</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>TLS Certs Integrated</TableItem>
                  <TableItem>TBD</TableItem>
                </TableRow>
              </Appear>
              <Appear>
                <TableRow>
                  <TableItem>Identity Server Integrated (Legacy Components)</TableItem>
                  <TableItem>TBD</TableItem>
                </TableRow>
              </Appear>
            </Table>
          </Slide>
          <Slide align="flex-start" transition={["fade"]} transitionDuration={1} bgColor="secondary" textColor="primary">
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Progress <Icon className="fa fa-line-chart" />
            </Heading>
            <Layout>
              <Fill>
                <Text textSize="2.5em" textColor="#ffef42"><Icon className="fa fa-user-secret" /> <Icon className="fa fa-key" /></Text>
              </Fill>
              <Fill>
                <Text textSize="2.5em" textColor="#ffef42"><Icon className="fa fa-lock" /></Text>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor="#61ff42">Almost complete working on final integration to protect SRSAPI</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#61ff42">Proof of concept set up with DJ & Chris</Text></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor="#ff4242">Existing consumers need to be upgraded (including external vendors)</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#ff4242">Auto-renewing and client configuration policy needs R&D</Text></Appear>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Appear><Text textColor="#ff4242">Legacy resources need to be upgraded to use Identity Server</Text></Appear>
              </Fill>
              <Fill>
                <Appear><Text textColor="#61ff42">Once activated, protection would be ubiquitous</Text></Appear>
              </Fill>
            </Layout>
          </Slide>
          <Slide align="flex-start" transition={["slide"]} bgColor="secondary" textColor="primary" >
            <Heading size={1} caps lineHeight={1} textColor = "white">
              Questions For You <Icon className="fa fa-question-circle-o" />
            </Heading>
            <List>
              <Appear><ListItem>What program should we target for the enhanced security model?</ListItem></Appear>
              <Appear><ListItem>Messaging at the user summit?</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} fit caps lineHeight={1} textColor="black">
              Questions ?
            </Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

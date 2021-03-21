import {h, Component} from 'preact';
import TabBar from 'preact-material-components/TabBar';
import 'preact-material-components/TabBar/style.css';


export default class TabBarPage extends Component {
    render() {
      return (
        <div>
          <TabBar>
            <TabBar.Tab active>
              <TabBar.TabLabel>Tab1</TabBar.TabLabel>
            </TabBar.Tab>
            <TabBar.Tab>
              <TabBar.TabLabel>Tab2</TabBar.TabLabel>
            </TabBar.Tab>
            <TabBar.Tab>
              <TabBar.TabLabel>Tab3</TabBar.TabLabel>
            </TabBar.Tab>
          </TabBar>
        </div>
      );
    }
  }
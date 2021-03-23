import {h, Component} from 'preact';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';
import Icon from 'preact-material-components/Icon';
import styles from './style.css';

export default class PopupBox extends Component {
    render(){
      return (
        <div>
            {
            /*
            <Icon className={styles.icon} onClick={() => {
                this.scrollingDlg.MDComponent.show();
            }}>
                info
            </Icon>
            */} 
          <Dialog ref={scrollingDlg=>{this.scrollingDlg=scrollingDlg;}}>
            <Dialog.Header>Scroll for me ;)</Dialog.Header>
            <Dialog.Body scrollable={true}>
              <List>
                <List.Item>Item 1</List.Item>
                <List.Item>Item 2</List.Item>
                <List.Item>Item 3</List.Item>
                <List.Item>Item 4</List.Item>
                <List.Item>Item 5</List.Item>
              </List>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.FooterButton cancel={true}>Decline</Dialog.FooterButton>
              <Dialog.FooterButton accept={true}>Accept</Dialog.FooterButton>
            </Dialog.Footer>
          </Dialog>
        </div>
      );
    }
  }
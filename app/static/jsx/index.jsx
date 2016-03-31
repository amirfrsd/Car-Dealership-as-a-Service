import HeloWorld from './hello-world.jsx';

var MainClass = React.createClass({
  render:function(){
    return (
        <div>
            <div>this is the main component</div>
            <div><HeloWorld /></div>
        </div>
        );
  }
});

ReactDOM.render(<MainClass />, document.getElementById('index'));
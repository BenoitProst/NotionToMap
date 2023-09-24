import Map from './Map';
import ListingSideBar from './ListingSideBar';


function App() {
    return (
      <div>
      <div class='sidebar'>
      <div class='heading'>
        <h1>Our locations</h1>
      </div>
      <ListingSideBar />
    </div>
     
      <Map />
      </div>
    )
}

export default App

import Map from './Map'

function App() {
    return (
      <div>
      <div class='sidebar'>
      <div class='heading'>
        <h1>Our locations</h1>
      </div>
      <div id='listings' class='listings'></div>
    </div>
     
      <Map />
      </div>
    )
}

export default App

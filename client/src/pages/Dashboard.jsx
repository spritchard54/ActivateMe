export default function Dashboard() {
  return (
    <div className="container-fluid w-75">
      
      
      
      <div className="row mt-5">
        <div className="col">
          <h2 className="my-3">Dashboard</h2>
        </div>
        <div className="col">
          <button className="my-3 logAct">Log Activity</button>
        </div>
        
      </div>

      <div className="row mt-2 py-5">
        <div className="col">Daily Breakdown</div>
        <div className="col">Weekly Breakdown</div>
        <div className="col">Monthly Breakdown</div>
      </div>

      <div className="row">
        <h4 id="recActivities" className="my-3 py-1">Recent Activities</h4>
        <div className="card p-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
            voluptates tenetur excepturi facilis animi labore, facere beatae
            reprehenderit odit esse a odio veniam at? Voluptatibus, laboriosam?
            Accusantium quae voluptatibus sunt. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Modi dolorem accusantium consequuntur
            magnam a, optio hic illum placeat tempora dignissimos ullam nobis
            magni cupiditate voluptatum quibusdam qui, dolor omnis veniam!
          </p>
        </div>
      
      </div>
    
    </div>
  );
}

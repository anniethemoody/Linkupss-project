import React, { Component } from 'react';
const Home = () => {
    const title = "Linkupss"
    const desc = "To serve and simplify your community engagements with modern technology"
    const btnText = "Learn more"
    return ( 
        <div className="container py-4">
        <Jumbotron desc = {desc} title={title} btnText={btnText}/>
          
          <div>
        <div className = "main title">
            What do we do?
        </div>

        <div className = "goal">
            Explain our overall company goals what we are trying to achieve
        </div>

        <div className="container">
            <div className="row">
            <div className="col-1"></div>
            <div className="col-4">
                <main className = "animate__animated animate__fadeInLeft">
                    <img className = "imageLeft" src = "temp.jpg"/>
                </main>
            </div>
            <div className="col-1"></div>
            <div className="col-5">
                <div className = "description">
                    <div className="shadow p-3 mb-5 rounded">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint id, similique rerum eaque a excepturi mollitia reiciendis, ducimus voluptate perferendis vel perspiciatis dolore iusto accusamus totam suscipit blanditiis dignissimos distinctio!w</div>
                </div>
            <div className="col-1"></div>
            </div>
            </div>
        </div>

        <div className="container">
            <div className="row">
            <div className="col-1"></div>
            <div className="col-5">
                <div className = "description">
                    <div className="shadow p-3 mb-5 rounded">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint id, similique rerum eaque a excepturi mollitia reiciendis, ducimus voluptate perferendis vel perspiciatis dolore iusto accusamus totam suscipit blanditiis dignissimos distinctio!w</div>
                </div>
            </div>
            <div className="col-1"></div>
            <div className="col-4">
                <main className = "animate__animated animate__fadeInRight">
                    <img className = "imageRight" src = "temp.jpg"/>
                </main>
            <div className="col-1"></div>
            </div>
            </div>
        </div>

        <div className="container">
            <div className="row">
            <div className="col-1"></div>
            <div className="col-4">
                <main className = "animate__animated animate__fadeInLeft">
                    <img className = "imageLeft" src = "temp.jpg"/>
                </main>
            </div>
            <div className="col-1"></div>
            <div className="col-5">
                <div className = "description">
                    <div className="shadow p-3 mb-5 rounded">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint id, similique rerum eaque a excepturi mollitia reiciendis, ducimus voluptate perferendis vel perspiciatis dolore iusto accusamus totam suscipit blanditiis dignissimos distinctio!w</div>
                </div>
            <div className="col-1"></div>
            </div>
            </div>
        </div>
    </div>  
    </div>
     );
}
 
export default Home;
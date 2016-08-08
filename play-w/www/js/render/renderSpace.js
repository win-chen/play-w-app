(function() {
          "use strict";
          console.log("Rendering space");
          window.addEventListener('load', function() {

            var container, camera, scene, sceneStars, renderer, controls, geometry, mesh;

            var animate = function(){

              window.requestAnimationFrame( animate );

              controls.update();
              window.scene = scene;
              window.sceneStars = sceneStars
              window.camera = camera;
              window.renderer = renderer;

              renderer.clear();
              renderer.render( scene, camera );
              renderer.clearDepth();
              renderer.render( sceneStars, camera );
            };

            container = document.getElementById( 'container' );

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

            controls = new THREE.DeviceOrientationControls( camera );

            scene = new THREE.Scene();
            sceneStars = new THREE.Scene();
            // SPHERE
            var geometry = new THREE.SphereGeometry( 1000, 16, 8 );
            geometry.scale( - 1, 1, 1 );

            var material = new THREE.MeshBasicMaterial( {
              map: new THREE.TextureLoader().load( './img/skymap.jpg'),
              overdraw: true
            } );

            var mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            // Removed box around camera
            // var geometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
            // var material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.BackSide, wireframeLinewidth: 0, wireframe: true } );
            // var mesh = new THREE.Mesh( geometry, material );
            // scene.add( mesh );
            // SPHERE END

            // PARTICLES
            // create the particle variables
            var particleCount = 400,
                particles = new THREE.Geometry(),
                pMaterial = new THREE.PointsMaterial({
              color: 0xFFFFFF,
              size: 10,
              map: new THREE.TextureLoader().load(
                "./img/particle2.png"
              ),
              blending: THREE.AdditiveBlending,
              transparent: true
            });


            // now create the individual particles
            for (var p = 0; p < particleCount; p++) {

              // create a particle with random
              // position values, -250 -> 250
              var pX = Math.random() * 500 - 250,
                  pY = Math.random() * 500 - 250,
                  pZ = Math.random() * 500 - 250,
                  particle = new THREE.Vector3(pX, pY, pZ);

              // add it to the geometry
              particles.vertices.push(particle);
            }

            // create the particle system
            var particleSystem = new THREE.Points(
                particles,
                pMaterial);
            console.log("particle system created");
            particleSystem.sortParticles = true;
            // add it to the scene
            sceneStars.add(particleSystem);

            // PARTICLES END

            // RENDER
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = 0;
            renderer.autoClear = false;
            container.appendChild(renderer.domElement);

            window.addEventListener('resize', function() {

              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize( window.innerWidth, window.innerHeight );

            }, false);

            animate();

          }, false);

      })();

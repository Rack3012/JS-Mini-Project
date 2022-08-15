let move_speed = 3, gravity = 0.3;
let bird = document.querySelector('.bird');
let image = document.getElementById('bird-1');

let bird_props = bird.getBoundingClientRect();//position of bird relative to viewport

let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let score_title = document.querySelector('.score_title');
let message = document.querySelector('.message');

let game_state = 'Start';
image.style.display = 'none';
message.classList.add('messageStyle');//to add a class 

document.addEventListener('keydown', (e)=>{
    // Start the game if enter key is pressed
    //jbb tak hmm enter press nhi karenge game start nhi hoga
    if(e.key == 'Enter' && game_state != 'Play')//doubt e.key == Enter
    {
        document.querySelectorAll('.pipe_sprite').forEach((e)=>{
            e.remove();
        });

        image.style.display = 'block';
        bird.style.top = '40vh'
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score :';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle')//to remove the message box
        play();
    }
});

function play(){
    function move(){
         // Detect if game has ended
        if(game_state != 'Play')return;
    // Getting reference to all the pipe elements
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    // running loop through each pipe
        pipe_sprite.forEach((element)=>{
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();
            
            if (pipe_sprite_props.right <= 0) {
                element.remove();
            }else{
                if (//doubt
            
                    bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width
                    && bird_props.left + bird_props.width > pipe_sprite_props.left
                    && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height
                    && bird_props.top + bird_props.height > pipe_sprite_props.top) 
                    {
                        
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter to Restart'
                    console.log("a................................................bh");
                    message.classList.add('messageStyle')
                    image.style.display = 'none';
                    return;
                }
                else{
                    //Increase the score if player has the successfully dodged the 
                    if(pipe_sprite_props.right < bird_props.left
                        && pipe_sprite_props.right + move_speed >= bird_props.left
                        && element.increase_score == '1'// increase_score == 1 create_pipe() se aa rha h
                        ){
                            console.log("a................................................zzz");
                            score_val.innerHTML =+ score_val.innerHTML+2;
                        }
                        element.style.left = pipe_sprite_props.left - move_speed +'px';
                        
                }
            }
        })
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if (game_state != 'Play') return;
            
        bird_dy = bird_dy+gravity;
        document.addEventListener('keydown', (e)=>{
            //if (e.keyCode == 38 || e.keyCode == 32)
            if (e.key == 'ArrowUp' || e.key == ' ') {
                image.src = 'img/birds.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e)=>{
            if (e.key == 'ArrowUp' || e.key == ' ') //
            {
                image.src = 'img/birdf.png'
            }
        });

        // Collision detection with bird and window top and bottom
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    } 
    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;
    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play')return;

        if (pipe_separation > 115) {
                // upper pipe
            let pipe_img_f = document.createElement('img');
            pipe_img_f.id = 'im1';
            pipe_img_f.src = 'img/pipe.png';
              // lower pipe
            let pipe_img_s = document.createElement('img');
            pipe_img_s.id = 'im2';
            pipe_img_s.src = 'img/pipe.png';
// creating upper pipe
            pipe_separation = 0;
            let pipe_posi = Math.floor(Math.random() * 43)+8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 75 + 'vh';
            pipe_sprite_inv.style.left = '100vw';
            pipe_sprite_inv.appendChild(pipe_img_f);
            document.body.appendChild(pipe_sprite_inv);
// creating lower pipe
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';
            pipe_sprite.appendChild(pipe_img_s);
            document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
export class Player extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'knightDemo');

        scene.add.existing(this);

        this.setRectangle(60, 140);

        this.setFixedRotation();

        this.setFrictionAir(0);
        this.setFriction(0);
        this.setBounce(0);

        this.isGrounded = false;

        this.initAnimations();
        this.jumpCooldown = 0;
        this.facing = 'right';
        this.jumping = false;
        this.jumpCharging = false;
        this.charge = 0;
        this.bounceCooldown = 0;
        this.carrying = false;
        this.onLadder = false;
        this.climbing = true;
    }

    initAnimations ()
    {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 4 }),
            frameRate:10,
            repeat: -1,
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'leftPrincess',
            frames: this.anims.generateFrameNumbers('dudePrincess', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turnPrincess',
            frames: this.anims.generateFrameNumbers('dudePrincess', { start: 4, end: 4 }),
            frameRate:10,
            repeat: -1,
        })

        this.anims.create({
            key: 'rightPrincess',
            frames: this.anims.generateFrameNumbers('dudePrincess', { start: 5, end: 8}),
            frameRate: 10,
            repeat: -1,
        })
    }

    moveLeft ()
    {
        if (this.climbing){
            this.setVelocityX(-1);
        } else{
            this.setVelocityX(-4);
        }
        
        if (this.carrying){
            //this.anims.play('leftPrincess', true);
            this.setTexture('knight');
        } else {
            //this.anims.play('left', true);
            this.setTexture('knight');
        }
        this.facing = 'left';
    }

    moveRight ()
    {
        if (this.climbing){
            this.setVelocityX(1);
        } else{
            this.setVelocityX(4);
        }

        if (this.carrying) {
            //this.anims.play('rightPrincess', true);
            this.setTexture('knight');
        } else {
            //this.anims.play('right', true);
            this.setTexture('knight');
        }
        this.facing = 'right';
    }

    idle ()
    {
       if (!this.jumping)
        {
        this.setVelocityX(0);
        }
        if (this.carrying) {
            //this.anims.play('turnPrincess');
            this.setTexture('knight');
        } else {
            //this.anims.play('turn');
            this.setTexture('knight');
        }

        if(!this.onLadder) {
            this.climbing = false;
        }
    }

    jump ()
    {
        if (Math.abs(this.body.velocity.y) < 0.5) {
            this.setVelocityY(this.charge);
            this.jumpCooldown = 40;
            this.jumping = true;
            if (this.facing == 'right')
            {
                this.setVelocityX(4);
            }
            else if (this.facing == 'left')
            {
                this.setVelocityX(-4);
            }
        }
    }   

    climb ()
    {
        this.setVelocityY(-1.5);
    }

    update(cursors, space)
    {
        // Reset jumping flag
        if (Math.abs(this.body.velocity.y) < 0.5 && this.isGrounded){
            this.jumping = false;
        }

        // Decrement cooldowns
        if (this.jumpCooldown > 0 && this.isGrounded){
            this.jumpCooldown -= 1;
        }

        if (this.bounceCooldown > 0){
            this.bounceCooldown -= 1;
        }

        // Handle movement
        if (cursors.left.isDown){
            this.facing = 'left';
            if (!this.jumping) {
                this.moveLeft();
            } else {
                if (this.carrying){
                    //this.anims.play('leftPrincess', true);
                    this.setTexture('knight');
                } else {
                    //this.anims.play('left', true);
                    this.setTexture('knight');
                }
            }
        } else if (cursors.right.isDown) {
            this.facing = 'right';
            if (!this.jumping) {
                this.moveRight();
            } else {
                if (this.carrying){
                    //this.anims.play('rightPrincess', true);
                    this.setTexture('knight');
                } else {
                    //this.anims.play('right', true);
                    this.setTexture('knight');
                }
            }
        } else if (!this.jumpCharging && !this.isGrounded) {
            if (this.jumping) {
                if (this.facing === 'right') {
                    if (this.carrying){
                        //this.anims.play('rightPrincess', true);
                        this.setTexture('knight');
                    } else {
                        //this.anims.play('right', true);
                        this.setTexture('knight');
                    }
                } else {
                    if (this.carrying){
                        //this.anims.play('leftPrincess', true);
                        this.setTexture('knight');
                    } else {
                        //this.anims.play('left', true);
                        this.setTexture('knight');
                    }
                }
            }
        } else if (!this.jumpCharging && !this.jumping){
            this.idle();
        }

        // Handle charging
        if (space.isDown && this.isGrounded && this.jumpCooldown == 0 && !this.climbing){
            this.idle();
            if (this.carrying) {
                if (this.facing === 'right'){
                    //this.setTexture('dudeCPRight');
                } else {
                    //this.setTexture('dudeCPLeft');
                }
            } else {
                if (this.facing === 'right'){
                    //this.setTexture('dudeCrouchRight');
                } else {
                    //this.setTexture('dudeCrouchLeft');
                }
            }
            this.jumpCharging = true;
            if (this.charge > -12){
                this.charge -= 0.2;
            }
        }

        // Handle jump release
        if (space.isUp && this.jumpCharging == true){
            this.jump();
            //this.setTexture('dude');
            this.jumpCharging = false;
            this.charge = 0;
        }

        // World boundary bounce
        if (this.bounceCooldown === 0 && !this.isGrounded && !this.climbing) {
            if ((this.x <= 30 && Math.abs(this.body.velocity.x) < 1) || 
                (this.x >= 770 && Math.abs(this.body.velocity.x) < 1)) {
                
                if (this.x <= 30) {
                    this.setVelocityX(4);
                    this.setVelocityY(this.body.velocity.y * 0.5);
                    this.bounceCooldown = 20;
                } else if (this.x >= 770) {
                    this.setVelocityX(-4);
                    this.setVelocityY(this.body.velocity.y * 0.5);
                    this.bounceCooldown = 20;
                }
            }
        }

        // Handle ladder climbing
        if (cursors.up.isDown && this.onLadder){
            this.climb();
            if (this.carrying) {
                this.setTexture('dudeCPRight');
            } else {
                this.setTexture('dudeCrouchRight');
            }
            this.climbing = true;

            if (!cursors.left.isDown && !cursors.right.isDown) {
                this.setVelocityX(this.body.velocity.x * 0.8);
            }
        }
    }
}

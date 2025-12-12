export class Player extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'knightDemo');

        scene.add.existing(this);

        this.setRectangle(50, 140);

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
        this.throwing = false;

        this.label === 'knight';
    }

    initAnimations ()
    {
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('knightIdle', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('knightIdle', { start: 6, end: 13 }),
            frameRate: 12,
            repeat: -1,
        })
        this.anims.create({
            key: 'idleLeftP',
            frames: this.anims.generateFrameNumbers('knightIdlPrin', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: 'idleRightP',
            frames: this.anims.generateFrameNumbers('knightIdlPrin', { start: 8, end: 14 }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: 'runLeft',
            frames: this.anims.generateFrameNumbers('knightRun', { start: 5, end: 0}),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: 'runRight',
            frames: this.anims.generateFrameNumbers('knightRun', { start: 6, end: 10}),
            frameRate: 12,
            repeat: -1,
        })
        this.anims.create({
            key: 'runLeftP',
            frames: this.anims.generateFrameNumbers('knightRunP', { start: 5, end: 0}),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: 'runRightP',
            frames: this.anims.generateFrameNumbers('knightRunP', { start: 6, end: 10}),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: 'throwLeft',
            frames: this.anims.generateFrameNumbers('knightThrow', { start: 14, end: 0 }),
            frameRate:12,
            repeat: 0,
        })

        this.anims.create({
            key: 'throwRight',
            frames: this.anims.generateFrameNumbers('knightThrow', { start: 15, end: 28 }),
            frameRate:12,
            repeat: 0,
        })

        this.anims.create({
            key: 'chargeLeft',
            frames: this.anims.generateFrameNumbers('knightCharge', { start: 0, end: 5 }),
            frameRate:12,
            repeat: 0,
        })

        this.anims.create({
            key: 'chargeRight',
            frames: this.anims.generateFrameNumbers('knightCharge', { start: 10, end: 6 }),
            frameRate:12,
            repeat: 0,
        })
        this.anims.create({
            key: 'chargeLeftP',
            frames: this.anims.generateFrameNumbers('knightChaPrin', { start: 0, end: 5 }),
            frameRate:12,
            repeat: 0,
        })

        this.anims.create({
            key: 'chargeRightP',
            frames: this.anims.generateFrameNumbers('knightChaPrin', { start: 10, end: 6 }),
            frameRate:12,
            repeat: 0,
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
            //carrying animation
            this.anims.play('runLeftP', true);
        } else {
            this.anims.play('runLeft', true);
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
            //carrying animation
            this.anims.play('runRightP', true);
        } else {
            this.anims.play('runRight', true);
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
            //carrying animation
            if (this.facing == 'left'){
                this.anims.play('idleLeftP', true);
            } else {
                this.anims.play('idleRightP', true);
            }
        } else {
            if (this.facing == 'left'){
                this.anims.play('idleLeft', true);
            } else {
                this.anims.play('idleRight', true);
            }

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
                this.anims.play('runRight', true);
            }
            else if (this.facing == 'left')
            {
                this.setVelocityX(-4);
                this.anims.play('runLeft', true);
            }
        }
    }   

    climb ()
    {
        this.setVelocityY(-1.5);
    }

    update(cursors, space)
    {
        if (this.throwing) {
            return;
        }

        if (!this.onLadder && !this.isGrounded) {
            // Do a quick check: are we extremely close to a platform vertically?
            // This catches edge cases where collision didn't fire
        const groundCheck = this.scene.matter.overlap(this.body, 
            this.scene.matter.world.localWorld.bodies.filter(b => b.label === 'platform')
        );
        if (groundCheck) {
            this.isGrounded = true;
        }
}

        if (!this.onLadder) {
            this.climbing = false;
        }

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
                    //carrying animation
                    this.anims.play('runLeftP', true);
                } else {
                    this.anims.play('runLeft', true);
                }
            }
        } else if (cursors.right.isDown) {
            this.facing = 'right';
            if (!this.jumping) {
                this.moveRight();
            } else {
                if (this.carrying){
                    //carrying animation
                    this.anims.play('runRightP', true);
                } else {
                    this.anims.play('runRight', true);
                }
            }
        } else if (!this.jumpCharging && !this.isGrounded) {
            if (this.jumping) {
                if (this.facing === 'right') {
                    if (this.carrying){
                        //carrying animation should be here
                        this.anims.play('runRight', true);
                    } else {
                        this.anims.play('runRight', true);
                    }
                } else {
                    if (this.carrying){
                        //carrying animation should be here
                        this.anims.play('runLeft', true);
                    } else {
                        this.anims.play('runLeft', true);
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
                    this.anims.play('chargeRightP', true);
                } else {
                    this.anims.play('chargeLeftP', true);
                }
            } else {
                if (this.facing === 'right'){
                    this.anims.play('chargeRight', true);
                } else {
                    this.anims.play('chargeLeft', true);
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
            if (this.carrying){
                    //carrying animation
                    if (this.facing == 'left') {
                        this.anims.play('runLeftP', true);
                    } else {
                        this.anims.play('runRightP', true);
                    }
                } 
            else {
                    if (this.facing == 'left') {
                        this.anims.play('runLeft', true);
                    } else {
                        this.anims.play('runRight', true);
                    }
            }
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
            //carrying animation
            if (this.facing == 'left'){
                this.anims.play('idleLeftP', true);
            } else {
                this.anims.play('idleRightP', true);
            }
        } else {
            if (this.facing == 'left'){
                this.anims.play('idleLeft', true);
            } else {
                this.anims.play('idleRight', true);
            }

        }
            this.climbing = true;

            if (!cursors.left.isDown && !cursors.right.isDown) {
                this.setVelocityX(this.body.velocity.x * 0.8);
            }
        }

        

    }

    startThrow()
    {
        this.throwing = true;
        this.setVelocityX(0);
        
        if (this.facing === 'right') {
            if (this.x < 150) {
                this.anims.play('throwLeft', true)
            } else{
                this.anims.play('throwRight', true);
            } 
        } else {
            if (this.x < 650) {
                this.anims.play('throwLeft', true)
            } else{
                this.anims.play('throwRight', true);
            } 
        }
        
        // Set up completion listener
        this.once('animationcomplete', (animation) => {
            if (animation.key === 'throwRight' || animation.key === 'throwLeft') {
                this.throwing = false;
                this.carrying = false;
            }
        });
    }

}

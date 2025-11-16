export class Player extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'dude');

        scene.add.existing(this);

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
        this.bounced = false;
        this.carrying = false;
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
        this.setVelocityX(-4);

        if (this.carrying){
            this.anims.play('leftPrincess', true);
        } else {
            this.anims.play('left', true);
        }
        this.facing = 'left';
    }

    moveRight ()
    {
        this.setVelocityX(4);

        if (this.carrying) {
            this.anims.play('rightPrincess', true);
        } else {
            this.anims.play('right', true);
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
            this.anims.play('turnPrincess');
        } else {
            this.anims.play('turn');
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
}

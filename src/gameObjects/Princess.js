export class Princess extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'princess');

        scene.add.existing(this);

        this.setFixedRotation();

        this.setFriction(0, 0, 0);
        this.setBounce(0);

        this.bounce = -1;
        this.bounceCooldown = 0;
        this.isGrounded = false;

        this.label === 'princess';
    }

    throwRight () {
        this.setVelocityX(5);
        this.setVelocityY(-5);
        this.setTexture('princessAirRight');
    }

    throwLeft () {
        this.setVelocityX(-5);
        this.setVelocityY(-5);
        this.setTexture('princessAirLeft');
    }

    update()
    {
        // Decrement bounce cooldown
        if (this.bounceCooldown > 0){
            this.bounceCooldown -= 1;
        }

        // Ground bounce
        if (this.isGrounded && this.body.velocity.y >= 0 && this.bounceCooldown === 0){
            if (Math.abs(this.body.velocity.x) > 0.5 || Math.abs(this.body.velocity.y) > 0) {
                this.setVelocityY(this.bounce); 
                this.setVelocityX(this.body.velocity.x * 0.5);
                this.bounce *= 0.5;
                this.bounceCooldown = 20;  
            } else {
                this.setVelocityX(0);
            }
            this.setTexture('princess');
        }

        // World boundary bounce
        if (this.bounceCooldown === 0) {
            if ((this.x <= 30 && Math.abs(this.body.velocity.x) < 1) || 
                (this.x >= 770 && Math.abs(this.body.velocity.x) < 1)) {
                
                if (this.x <= 30) {
                    this.setVelocityX(3);
                    this.setVelocityY(this.body.velocity.y * 0.5);
                    this.bounceCooldown = 20;
                } else if (this.x >= 770) {
                    this.setVelocityX(-3);
                    this.setVelocityY(this.body.velocity.y * 0.5);
                    this.bounceCooldown = 20;
                }
            }
        }

        // Manual ground friction
        if (this.isGrounded && Math.abs(this.body.velocity.x) > 0 && Math.abs(this.body.velocity.y) < 1) {
            this.setVelocityX(this.body.velocity.x * 0.95);
            if (Math.abs(this.body.velocity.x) < 0.5) {
                this.setVelocityX(0);
            }
        }
    }
}

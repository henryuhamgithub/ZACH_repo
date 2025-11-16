export class Princess extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y)
    {
        super(scene.matter.world, x, y, 'princess');

        scene.add.existing(this);

        this.setFixedRotation();
        this.setFriction(.2, 0);
        this.setBounce(0);

        this.bounce = -5;
        this.isGrounded = false;
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
}

import {Player} from '../gameObjects/Player.js'
import {Princess} from '../gameObjects/Princess.js'
export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() 
    {
        this.add.image(400,1700, 'sky');

        this.platforms = [];

        // Create ground with visible sprite
        let groundSprite = this.add.tileSprite(400, 1968, 1600, 64, 'ground');
        this.matter.add.gameObject(groundSprite, { isStatic: true, label: 'platform' });
    
        // Create other platforms with sprites
        let platform1 = this.add.image(600, 1800, 'ground');
        this.matter.add.gameObject(platform1, { isStatic: true, label: 'platform' });
    
        let platform2 = this.add.image(50, 1650, 'ground');
        this.matter.add.gameObject(platform2, { isStatic: true, label: 'platform' });
    
        let platform3 = this.add.image(750, 1620, 'ground');
        this.matter.add.gameObject(platform3, { isStatic: true, label: 'platform' });

        this.player = new Player(this, 100, 1850);

        //player collisions with ground
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                const otherBody = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody.label === 'platform') {
                    this.player.isGrounded = true;
                }
            });
        });
        this.matter.world.on('collisionend', (event) => {
            event.pairs.forEach((pair) => {
                const otherBody = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody.label === 'platform') {
                    this.player.isGrounded = false;
                }
            });
        });

        //player wall bounce
        this.matter.world.on('collisionactive', (event) => {
            event.pairs.forEach((pair) => {
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body)) {
                    const normal = pair.collision.normal;
                    const otherBody = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
            
                    // Check if it's a platform collision
                    if (otherBody.label === 'platform' && this.player.jumping) {
                        // Check if hitting from the side (normal.x is significant)
                        if (Math.abs(normal.x) > 0.5) {
                            const currentVelY = this.player.body.velocity.y;
                    
                            // Hitting right side of platform (bounce left)
                            if (normal.x > 0) {
                                this.player.setVelocityX(-4);
                                this.player.setVelocityY(currentVelY + (currentVelY * 0.5));
                            }
                            // Hitting left side of platform (bounce right)
                            else {
                                this.player.setVelocityX(4);
                                this.player.setVelocityY(currentVelY + (currentVelY * 0.5));
                            }
                        }
                    }
                }
            });
        });

        this.princess = new Princess(this, 150, 1850);
        //princess and player collision
        this.matter.world.on('collisionstart', (event) => {
                event.pairs.forEach((pair) => {
                    const otherBody = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                    if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody === this.princess.body) {
                        this.pickupPrincess(this.player, this.princess);
                    }
            });
        });

        //princess collisions with ground
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                const otherBody = pair.bodyA === this.princess.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.princess.body || pair.bodyB === this.princess.body) && otherBody.label === 'platform') {
                    this.princess.isGrounded = true;
                }
            });
        });
        this.matter.world.on('collisionend', (event) => {
            event.pairs.forEach((pair) => {
                const otherBody = pair.bodyA === this.princess.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.princess.body || pair.bodyB === this.princess.body) && otherBody.label === 'platform') {
                    this.princess.isGrounded = false;
                }
            });
        });

        //princess wall bounce
        this.matter.world.on('collisionactive', (event) => {
            event.pairs.forEach((pair) => {
                if ((pair.bodyA === this.princess.body || pair.bodyB === this.princess.body)) {
                    const normal = pair.collision.normal;
                    const otherBody = pair.bodyA === this.princess.body ? pair.bodyB : pair.bodyA;
            
                    // Check if it's a platform collision
                    if (otherBody.label === 'platform' && !this.princess.isGrounded) {
                        // Check if hitting from the side (normal.x is significant)
                        if (Math.abs(normal.x) > 0.5) {
                            const currentVelY = this.princess.body.velocity.y
                            // Hitting right side of platform (bounce left)
                            if (normal.x > 0) {
                                this.player.setVelocityX(-4);
                                this.player.setVelocityY(currentVelY + (currentVelY * 0.5));
                            }
                            // Hitting left side of platform (bounce right)
                            else {
                                this.princess.setVelocityX(7);
                                this.princess.setVelocityY(-7);
                            }
                        }
                    }
                }
            });
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.matter.world.setBounds(0, 0, 800, 2000);
        this.cameras.main.setBounds(0, 0, 800, 2000);
        this.cameras.main.startFollow(this.player);
    }
        
    update() 
    {
        
        var player = this.player;
        var cursors = this.cursors;
        var space = this.input.keyboard.addKey('Space');
        var princess = this.princess
        var xKey = this.input.keyboard.addKey('X');

        // Reset jumping flag FIRST
        if (Math.abs(player.body.velocity.y) < 0.5 && player.isGrounded){
            player.jumping = false;
        }

        // Decrement jump cooldown
        if (player.jumpCooldown > 0 && player.isGrounded){
            player.jumpCooldown -= 1;
        }

        // Handle movement
        if (cursors.left.isDown){
            player.facing = 'left';
            if (!player.jumping) {
                player.moveLeft();
            } else {
                if (player.carrying){
                    player.anims.play('leftPrincess', true);
                } else {
                    player.anims.play('left', true);
                }
            }
        }else if (cursors.right.isDown) {
            player.facing = 'right';
            if (!player.jumping) {
                player.moveRight();
            } else {
                if (player.carrying){
                    player.anims.play('rightPrincess', true);
                } else {
                    player.anims.play('right', true);
                }
            }
        } else if (!player.jumpCharging && !player.isGrounded) {
            if (player.jumping) {
                if (player.facing === 'right') {
                    if (player.carrying){
                        player.anims.play('rightPrincess', true);
                    } else {
                        player.anims.play('right', true);
                    }
                } else {
                    if (player.carrying){
                        player.anims.play('leftPrincess', true);
                    } else {
                        player.anims.play('left', true);
                    }
                }
            }
        }else if (!player.jumpCharging && !player.jumping){
            player.idle();
            player.bounced = false;
        }

        // Handle charging and then jumping
        if (space.isDown && player.isGrounded && player.jumpCooldown == 0){
            player.idle();
            if (player.carrying) {
                player.setTexture('dudeCP');
            } else{
                player.setTexture('dudeCrouch');
            }
            player.jumpCharging = true;
            if (player.charge > -12){
                player.charge -=.2;
            }
        }

        if (space.isUp && player.jumpCharging == true){
            player.jump();
            player.setTexture('dude');
            player.jumpCharging = false;
            player.charge = 0;
        }

        //throw princess
        if (xKey.isDown && player.carrying){
            princess.setVisible(true);
            princess.setStatic(false);
            princess.setSensor(false);
            princess.setPosition(player.x, player.y - 50);

            if (player.facing == 'right') {
                princess.throwRight();
            } else if (player.facing == 'left') {
            princess.throwLeft();
            }

            player.carrying = false;
            princess.bounce = -5
        }

        //princess bounce
        if (princess.isGrounded && princess.body.velocity.y <= 0){
            if (princess.grounded){
                princess.setVelocityY(princess.bounce); 
                princess.setVelocityX(princess.body.velocity.x * 0.5);
                princess.bounce *= .5
            } else {
                princess.setVelocityX(0);
            }
            princess.setTexture('princess');
        }
    }
    
    pickupPrincess(player, Princess)
    {

        if (this.player.carrying) return;

        this.princess.setVisible(false);
        this.princess.setStatic(true);
        this.princess.setSensor(true);
        this.princess.setPosition(-100, -100);
        this.player.carrying = true;
    }
}

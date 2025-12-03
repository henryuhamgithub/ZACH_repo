import {Player} from '../gameObjects/Player.js'
import {Princess} from '../gameObjects/Princess.js'
import {Enemy} from '../gameObjects/Enemy.js'
export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() 
    {
        this.add.image(400,2500, 'levelBackground');

        //
        //LEVEL 1
        //

        let ground = this.add.image(400, 4983, 'base1');
        this.matter.add.gameObject(ground, { isStatic: true, label: 'platform' });

        let platform1 = this.add.image(35, 4675, 'base1');
        this.matter.add.gameObject(platform1, { isStatic: true, label: 'platform' });

        let platform2 = this.add.image(640, 4550, 'base2small');
        this.matter.add.gameObject(platform2, { isStatic: true, label: 'platform' })

        let ladder1 = this.add.image(475, (5000-175-17), 'ladderLongLvl1');
        this.matter.add.gameObject(ladder1, { isStatic: true, isSensor: true, label: 'ladder' });
    
        
        //create slopes
        const shapes = this.cache.json.get('slope135Shapes');
        let slope135Sprite = this.add.image(250, 1400, 'slope135');
        this.matter.add.gameObject(slope135Sprite, {
            shape: shapes.slope135,
            isStatic: true,
            label: 'platform'
        });
        

        //create buttons and button enabling stuff in pairs
        let buttonSlope1 = this.add.image(500, 1100, 'slope135Invis');
        this.matter.add.gameObject(buttonSlope1, {shape: shapes.slope135, isStatic: true, isSensor: true, label: 'platform'} );
        buttonSlope1.setData('enabledTexture', 'slope135');

        let button1 = this.add.image(24, 1700, 'buttonSide');
        this.matter.add.gameObject(button1, {isStatic: true, isSensor: true, label: 'button'});
        button1.setData('controlledPlatform', buttonSlope1);  // Link button to its platform
        button1.setData('isPressed', false);
        button1.setData('pressedTexture', 'buttonSidePressed')
        

        //player and princess
        this.player = new Player(this, 100, 4850);
        this.princess = new Princess(this, 400, 4850);

        
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {

                //player collision with ground
                const otherBody1 = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody1.label === 'platform') {
                    this.player.isGrounded = true;
                }

                //player collision with ladder
                const otherBody2 = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody2.label === 'ladder') {
                    this.player.onLadder = true;
                }

                //princess and player collision
                const otherBody3 = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody3 === this.princess.body) {
                    this.pickupPrincess(this.player, this.princess);
                }

                //princess wall bounce
                if ((pair.bodyA === this.princess.body || pair.bodyB === this.princess.body)) {
                    const normal = pair.collision.normal;
                    const otherBody = pair.bodyA === this.princess.body ? pair.bodyB : pair.bodyA;
                    // Check if it's a platform  or world boundary collision
                    if (otherBody.label === 'platform' && !this.princess.isGrounded && this.princess.bounceCooldown == 0) {
                        // Check if hitting from the side (normal.x is significant)
                        if (Math.abs(normal.x) > 0.5) {
                            const currentVelY = this.princess.body.velocity.y
                            // Hitting right side of platform (bounce left)
                            if (normal.x > 0) {
                                this.princess.setVelocityX(-3);
                                this.princess.setVelocityY(currentVelY + (currentVelY * 0.5));
                            }
                            // Hitting left side of platform (bounce right)
                            else {
                                this.princess.setVelocityX(3);
                                this.princess.setVelocityY(currentVelY + (currentVelY * 0.5));
                            }

                            this.princess.bounceCooldown = 20;
                        }
                    }
                }

                //princess collision with ground
                const otherBody4 = pair.bodyA === this.princess.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.princess.body || pair.bodyB === this.princess.body) && otherBody4.label === 'platform') {
                    const normal = pair.collision.normal;
                    if (Math.abs(normal.y) > .7){
                    this.princess.isGrounded = true;
                    }
                }

                //player collision with button
                const otherBody5 = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody5.label === 'button') {
                    
                    // Get the game object from the body
                    const buttonObj = otherBody5.gameObject;
                    
                    if (!buttonObj.getData('isPressed')) {  // Only activate once
                        const controlledPlatform = buttonObj.getData('controlledPlatform');
                        buttonObj.setData('isPressed', true);
                        buttonObj.setTexture(buttonObj.getData('pressedTexture'))
                        controlledPlatform.setSensor(false);
                        controlledPlatform.setTexture(controlledPlatform.getData('enabledTexture'));
                    }
                }

                //princess collision with button
                const otherBody6 = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.princess.body || pair.bodyB === this.princess.body) && otherBody6.label === 'button') {
                    
                    // Get the game object from the body
                    const buttonObj = otherBody6.gameObject;
                    
                    if (!buttonObj.getData('isPressed')) {  // Only activate once
                        const controlledPlatform = buttonObj.getData('controlledPlatform');
                        buttonObj.setData('isPressed', true);
                        buttonObj.setTexture(buttonObj.getData('pressedTexture'))
                        controlledPlatform.setSensor(false);
                        controlledPlatform.setTexture(controlledPlatform.getData('enabledTexture'));
                    }
                }

            });
        });

        this.matter.world.on('collisionend', (event) => {
            event.pairs.forEach((pair) => {

                //player
                const otherBody1 = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody1.label === 'platform') {
                    this.player.isGrounded = false;
                }

                const otherBody2 = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBody2.label === 'ladder') {
                    this.player.onLadder = false;
                    this.player.climbing = false;
                }
                
                //princess
                const otherBody3 = pair.bodyA === this.princess.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.princess.body || pair.bodyB === this.princess.body) && otherBody3.label === 'platform') {
                    this.princess.isGrounded = false;
                }

            });
        });

        
        this.matter.world.on('collisionactive', (event) => {

            event.pairs.forEach((pair) => {

                //player wall bounce
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body)) {
                    const normal = pair.collision.normal;
                    const otherBody = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
            
                    // Check if it's a platform collision
                    if (otherBody.label === 'platform' && this.player.jumping && this.player.bounceCooldown === 0) {
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

                            this.player.bounceCooldown = 20;
                        }
                    }
                }

            });

        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.matter.world.setBounds(0, 0, 800, 5000);
        this.cameras.main.setBounds(0, 0, 800, 5000);
        this.cameras.main.startFollow(this.player);

        //-----------------------------------------------------------
        // CREATE ENEMY POOL
        //-----------------------------------------------------------
        this.enemyPool = this.add.group({
            classType: Enemy,
            maxSize: 20,
            runChildUpdate: true
        });

        //-----------------------------------------------------------
        // SPAWN ENEMY FROM POOL
        //-----------------------------------------------------------
        this.enemy = this.enemyPool.get();
        this.enemy.activate(700, 4850);


        //-----------------------------------------------------------
        // COLLISION: PLAYER vs ENEMY  (knockback + dropping princess)
        //-----------------------------------------------------------
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {

                const A = pair.bodyA.gameObject;
                const B = pair.bodyB.gameObject;

                if (!A || !B) return;

                const enemy = this.enemy;

                // player hits enemy
                if (
                    enemy.active &&
                    ((A === this.player && B === enemy) ||
                    (A === enemy && B === this.player))
                ) {
                    var player = this.player;
                    var princess = this.princess;

                    // tell enemy it hit the player and shouldn't die this frame
                    enemy.markPlayerHit();

                    // direction knockback
                    const dx = player.x - enemy.x;
                    const dy = player.y - enemy.y;
                    const dir = dx < 0 ? -1 : 1;
                    const dirY = dy < 0 ? -1 : 1;

                    // drop princess 
                    if (player.carrying) {
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
                        princess.bounce = -5;
                    }

                    // knockback
                    player.setVelocity(dir * 3, dirY * 3);
                }

            });
        });


        //-----------------------------------------------------------
        // COLLISION: PRINCESS vs ENEMY  (kills enemy)
        //-----------------------------------------------------------
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {

                const A = pair.bodyA.gameObject;
                const B = pair.bodyB.gameObject;

                if (!A || !B) return;

                const enemy = this.enemy;

                // princess hits enemy
                if (
                    enemy.active &&
                    (!enemy.recentlyHitPlayer) &&
                    ((A === this.princess && B === enemy) ||
                    (A === enemy && B === this.princess))
                ) {
                    enemy.die();   // returns to pool
                }
            });
        });

    }
        
    update() 
    {
        const player = this.player;
        const princess = this.princess;
        const cursors = this.cursors;
        const space = this.input.keyboard.addKey('Space');
        const xKey = this.input.keyboard.addKey('X');

        // Update player and princess
        player.update(cursors, space);
        princess.update();

        // Throw princess 
        if (xKey.isDown && player.carrying && !player.climbing){
            princess.setVisible(true);
            princess.setStatic(false);
            princess.setSensor(false);
            princess.setPosition(player.x, player.y - 150);

            if (player.facing == 'right') {
                princess.throwRight();
            } else if (player.facing == 'left') {
                princess.throwLeft();
            }

            player.carrying = false;
            princess.bounce = -5;
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
        //this.player.setTexture('dudePrincess');
    }
}

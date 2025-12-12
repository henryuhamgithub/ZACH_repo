import {Player} from '../gameObjects/Player.js'
import {Princess} from '../gameObjects/Princess.js'
import {Enemy} from '../gameObjects/Enemy.js'
export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() 
    {
        //this.add.image(400,2500, 'layout');
        this.add.image(400,2500,'levelBackground');

        //
        //LEVEL 1
        //

        let ground = this.add.image(400, 4983, 'base1');
        this.matter.add.gameObject(ground, { isStatic: true, label: 'platform' });

        //let platform2 = this.add.image(640, 4550, 'base1small');
        //this.matter.add.gameObject(platform2, { isStatic: true, label: 'platform' });

        const shapes1 = this.cache.json.get('building1shapes');
        let building1 = this.add.image(270, 4300, 'building1');
        this.matter.add.gameObject(building1, {
            shape: shapes1.building1,
            isStatic: true,
            label: 'platform'
        });

        const shapes2 = this.cache.json.get('building2shapes');
        let building2 = this.add.image(340, 2590, 'building2');
        this.matter.add.gameObject(building2, {
            shape: shapes2.building2,
            isStatic: true,
            label: 'platform'
        });

        const shapesB3 = this.cache.json.get('building3shapes');
        let building3 = this.add.image(400, 725, 'building3');
        this.matter.add.gameObject(building3, {
            shape: shapesB3.building3,
            isStatic: true,
            label: 'platform'
        });

        let platformFinL = this.add.image(-300,200, 'base6');
        this.matter.add.gameObject(platformFinL, { isStatic: true, label: 'platform' });
        platformFinL.setVisible(false);
        let platformFinR = this.add.image(850,200, 'base6');
        this.matter.add.gameObject(platformFinR, { isStatic: true, label: 'platform' });
        platformFinR.setVisible(false);
        let triggerEnd = this.add.image(700,100, 'base2small');
        this.matter.add.gameObject(triggerEnd, { isStatic: true, label: 'end' });
        triggerEnd.setVisible(false);


        let platform1 = this.add.image(-130, 4665, 'base1');
        this.matter.add.gameObject(platform1, { isStatic: true, label: 'platform' });

        let platform3 = this.add.image(385,4665, 'base1tiny');
        this.matter.add.gameObject(platform3, { isStatic: true, label: 'platform' });

        let ladder1 = this.add.image(315, (5000-175-17), 'ladderLongLvl1');
        this.matter.add.gameObject(ladder1, { isStatic: true, isSensor: true, label: 'ladder' });

        let platform4 = this.add.image(420,4220, 'base1small');
        this.matter.add.gameObject(platform4, { isStatic: true, label: 'platform' });

        let platform5 = this.add.image(100,4100, 'base2small');
        this.matter.add.gameObject(platform5, { isStatic: true, label: 'platform' });
        
        let ladder2 = this.add.image(110, 4509, 'ladderLongLvl1');
        this.matter.add.gameObject(ladder2, { isStatic: true, isSensor: true, label: 'ladder' });

        let platform9 = this.add.image(820,1760, 'base5');
        this.matter.add.gameObject(platform9, { isStatic: true, label: 'platform' });

        let platform8 = this.add.image(750,3130, 'base4small');
        this.matter.add.gameObject(platform8, { isStatic: true, label: 'platform' });

        let platform10 = this.add.image(500,3260, 'base3small');
        this.matter.add.gameObject(platform10, { isStatic: true, label: 'platform' });

        let platform11 = this.add.image(230,1570, 'base5small');
        this.matter.add.gameObject(platform11, { isStatic: true, label: 'platform' });

        let platform13 = this.add.image(500,1370, 'base6small');
        this.matter.add.gameObject(platform13, { isStatic: true, label: 'platform' });

        let platform20 = this.add.image(-200,1040, 'base6');
        this.matter.add.gameObject(platform20, { isStatic: true, label: 'platform' });

        let platform21 = this.add.image(1000,1040, 'base6');
        this.matter.add.gameObject(platform21, { isStatic: true, label: 'platform' });

        let platform22 = this.add.image(250,900, 'base7small');
        this.matter.add.gameObject(platform22, { isStatic: true, label: 'platform' });

        let platform23 = this.add.image(550,960, 'base7small');
        this.matter.add.gameObject(platform23, { isStatic: true, label: 'platform' });

        let platform24 = this.add.image(530,730, 'base7small');
        this.matter.add.gameObject(platform24, { isStatic: true, label: 'platform' });

        let platform25 = this.add.image(50, 500, 'base7small');
        this.matter.add.gameObject(platform25, { isStatic: true, label: 'platform' });

        let platform26 = this.add.image(260, 350, 'base7small');
        this.matter.add.gameObject(platform26, { isStatic: true, label: 'platform' });

        let platform27 = this.add.image(750, 530, 'base7small');
        this.matter.add.gameObject(platform27, { isStatic: true, label: 'platform' });

        


        //create buttons and button enabling stuff in pairs
        const shapes = this.cache.json.get('slopeRShapes');
        let buttonSlope1 = this.add.image(550, 3767, 'slopeR');
        this.matter.add.gameObject(buttonSlope1, {
            shape: shapes.slopeRight,
            isStatic: true, 
            isSensor: true, 
            label: 'platform'

        });
        buttonSlope1.setData('enabledTexture', 'slopeR');
        buttonSlope1.setVisible(false);
        buttonSlope1.body.isSensor = true;
        buttonSlope1.body.parts.forEach(p => p.isSensor = true);

        let button1 = this.add.image(24, 3600, 'buttonSide');
        this.matter.add.gameObject(button1, {isStatic: true, isSensor: true, label: 'button'});
        button1.setData('controlledPlatform', buttonSlope1);  // Link button to its platform
        button1.setData('isPressed', false);
        button1.setData('pressedTexture', 'buttonSidePressed')

        const shapes6 = this.cache.json.get('slopeLShapes');
        let buttonSlope2 = this.add.image(450, 3500, 'slopeL');
        this.matter.add.gameObject(buttonSlope2, {
            shape: shapes6.slopeLeft,
            isStatic: true, 
            isSensor: true, 
            label: 'platform'

        });
        buttonSlope2.setData('enabledTexture', 'slopeL');
        buttonSlope2.setVisible(false);
        buttonSlope2.body.isSensor = true;
        buttonSlope2.body.parts.forEach(p => p.isSensor = true);

        let buttonS2 = this.add.image(776, 3300, 'buttonSide');
        this.matter.add.gameObject(buttonS2, {isStatic: true, isSensor: true, label: 'button'});
        buttonS2.setData('controlledPlatform', buttonSlope2);  // Link button to its platform
        buttonS2.setData('isPressed', false);
        buttonS2.setData('pressedTexture', 'buttonSidePressed')
        buttonS2.flipX = true;

        let buttonPlatform1 = this.add.image(210, 1930, 'base5small');
        this.matter.add.gameObject(buttonPlatform1, {
            isStatic: true, 
            isSensor: true, 
            label: 'platform'
        });
        buttonPlatform1.setData('enabledTexture', 'base5small');
        buttonPlatform1.setVisible(false);
        buttonPlatform1.body.isSensor = true;
        buttonPlatform1.body.parts.forEach(p => p.isSensor = true);

        let button2 = this.add.image(776, 2000, 'buttonSide');
        this.matter.add.gameObject(button2, {isStatic: true, isSensor: true, label: 'button'});
        button2.setData('controlledPlatform', buttonPlatform1);  // Link button to its platform
        button2.setData('isPressed', false);
        button2.setData('pressedTexture', 'buttonSidePressed')
        button2.flipX = true;

        let buttonPlatform2 = this.add.image(750, 2750, 'base4small');
        this.matter.add.gameObject(buttonPlatform2, {
            isStatic: true, 
            isSensor: true, 
            label: 'platform'
        });
        buttonPlatform2.setData('enabledTexture', 'base4small');
        buttonPlatform2.setVisible(false);
        buttonPlatform2.body.isSensor = true;
        buttonPlatform2.body.parts.forEach(p => p.isSensor = true);


        let button3 = this.add.image(24, 2800, 'buttonSide');
        this.matter.add.gameObject(button3, {isStatic: true, isSensor: true, label: 'button'});
        button3.setData('controlledPlatform', buttonPlatform2);  // Link button to its platform
        button3.setData('isPressed', false);
        button3.setData('pressedTexture', 'buttonSidePressed')

        let buttonPlatform3 = this.add.image(50, 1470, 'base5small');
        this.matter.add.gameObject(buttonPlatform3, {
            isStatic: true, 
            isSensor: true, 
            label: 'platform'
        });
        buttonPlatform3.setData('enabledTexture', 'base5small');
        buttonPlatform3.setVisible(false);
        buttonPlatform3.body.isSensor = true;
        buttonPlatform3.body.parts.forEach(p => p.isSensor = true);


        let button4 = this.add.image(24, 1540, 'buttonSide');
        this.matter.add.gameObject(button4, {isStatic: true, isSensor: true, label: 'button'});
        button4.setData('controlledPlatform', buttonPlatform3);  // Link button to its platform
        button4.setData('isPressed', false);
        button4.setData('pressedTexture', 'buttonSidePressed')

        let button4b = this.add.image(776, 1450, 'buttonSide');
        this.matter.add.gameObject(button4b, {isStatic: true, isSensor: true, label: 'button'});
        button4b.setData('controlledPlatform', buttonPlatform3);  // Link button to its platform
        button4b.setData('isPressed', false);
        button4b.setData('pressedTexture', 'buttonSidePressed')
        button4b.flipX = true;

        let buttonPlatform4 = this.add.image(250, 1270, 'base6small');
        this.matter.add.gameObject(buttonPlatform4, {
            isStatic: true, 
            isSensor: true, 
            label: 'platform'
        });
        buttonPlatform4.setData('enabledTexture', 'base6small');
        buttonPlatform4.setVisible(false);
        buttonPlatform4.body.isSensor = true;
        buttonPlatform4.body.parts.forEach(p => p.isSensor = true);


        let button5 = this.add.image(776, 1600, 'buttonSide');
        this.matter.add.gameObject(button5, {isStatic: true, isSensor: true, label: 'button'});
        button5.setData('controlledPlatform', buttonPlatform4);  // Link button to its platform
        button5.setData('isPressed', false);
        button5.setData('pressedTexture', 'buttonSidePressed')
        button5.flipX = true;

        let buttonPlatform5 = this.add.image(420, 1140, 'base6small');
        this.matter.add.gameObject(buttonPlatform5, {
            isStatic: true, 
            isSensor: true, 
            label: 'platform'
        });
        buttonPlatform5.setData('enabledTexture', 'base6small');
        buttonPlatform5.setVisible(false);
        buttonPlatform5.body.isSensor = true;
        buttonPlatform5.body.parts.forEach(p => p.isSensor = true);


        let button6 = this.add.image(776, 1300, 'buttonSide');
        this.matter.add.gameObject(button6, {isStatic: true, isSensor: true, label: 'button'});
        button6.setData('controlledPlatform', buttonPlatform5);  // Link button to its platform
        button6.setData('isPressed', false);
        button6.setData('pressedTexture', 'buttonSidePressed')
        button6.flipX = true;


        let ladder3 = this.add.image(320, 2790, 'ladderLongLvl1');
        this.matter.add.gameObject(ladder3, { 
            isStatic: true, 
            isSensor: true, 
            label: 'ladder' 
            });
        ladder3.setData('enabledTexture', 'ladderLongLvl1')
        ladder3.setVisible(false);
        ladder3.body.label = 'ladder';
        ladder3.body.parts.forEach(p => p.label = 'ladder');
        ladder3.body.isSensor = true;
        ladder3.body.parts.forEach(p => p.isSensor = true);

        let buttonL1 = this.add.image(776, 2500, 'buttonSide');
        this.matter.add.gameObject(buttonL1, {isStatic: true, isSensor: true, label: 'button'});
        buttonL1.setData('controlledPlatform', ladder3);  // Link button to its platform
        buttonL1.setData('isPressed', false);
        buttonL1.setData('pressedTexture', 'buttonSidePressed')
        buttonL1.flipX = true;

        let ladder4 = this.add.image(350, 2390, 'ladderShortLvl1');
        this.matter.add.gameObject(ladder4, { 
            isStatic: true, 
            isSensor: true, 
            label: 'ladder' 
            });
        ladder4.setData('enabledTexture', 'ladderShortLvl1')
        ladder4.setVisible(false);
        ladder4.body.label = 'ladder';
        ladder4.body.parts.forEach(p => p.label = 'ladder');
        ladder4.body.isSensor = true;
        ladder4.body.parts.forEach(p => p.isSensor = true);

        let buttonL2 = this.add.image(24, 2500, 'buttonSide');
        this.matter.add.gameObject(buttonL2, {isStatic: true, isSensor: true, label: 'button'});
        buttonL2.setData('controlledPlatform', ladder4);  // Link button to its platform
        buttonL2.setData('isPressed', false);
        buttonL2.setData('pressedTexture', 'buttonSidePressed')


        let platform6 = this.add.image(750,3600, 'base2small');
        this.matter.add.gameObject(platform6, { isStatic: true, label: 'platform' });

        let platform12 = this.add.image(500,3500, 'base2small');
        this.matter.add.gameObject(platform12, { isStatic: true, label: 'platform' });

        let platform7 = this.add.image(-100,3400, 'base3');
        this.matter.add.gameObject(platform7, { isStatic: true, label: 'platform' });

    
        
     

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
                    this.player.idle();
                }

                //player collision with END
                const otherBodyE = pair.bodyA === this.player.body ? pair.bodyB : pair.bodyA;
                if ((pair.bodyA === this.player.body || pair.bodyB === this.player.body) && otherBodyE.label === 'end') {
                    this.scene.start('GameOver');
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
                        if((controlledPlatform.label !== 'ladder')&&(controlledPlatform.body.label !== 'ladder')){
                            controlledPlatform.setSensor(false);
                            controlledPlatform.body.parts.forEach(p => p.isSensor = false);
                            }
                        controlledPlatform.setTexture(controlledPlatform.getData('enabledTexture'));
                        controlledPlatform.setVisible(true);
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
                        if((controlledPlatform.label !== 'ladder')&&(controlledPlatform.body.label !== 'ladder')){
                            controlledPlatform.setSensor(false);
                            controlledPlatform.body.parts.forEach(p => p.isSensor = false);
                            }
                        controlledPlatform.setTexture(controlledPlatform.getData('enabledTexture'));
                        controlledPlatform.setVisible(true);
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
                    this.player.setVelocityX(0);
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
        this.enemy.activate(600, 4750);

        this.enemy1 = this.enemyPool.get();
        this.enemy1.activate(620, 4500);
        this.enemy1.direction = -1;
        this.enemy1.flipX = true;

        this.enemy3 = this.enemyPool.get();
        this.enemy3.activate(250, 4020);

        this.enemy4 = this.enemyPool.get();
        this.enemy4.activate(350, 3570);
        this.enemy4.direction = -1;
        this.enemy4.flipX = true;
        this.enemy4.patrolDistance = 150;

        this.enemy2 = this.enemyPool.get();
        this.enemy2.activate(400, 3070);
        this.enemy2.flipX = true;
        this.enemy2.patrolDistance = 150;

        //-----------------------------------------------------------
        // COLLISION: PLAYER vs ENEMY  (knockback + dropping princess)
        //-----------------------------------------------------------
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {

                const A = pair.bodyA.gameObject;
                const B = pair.bodyB.gameObject;

                if (!A || !B) return;

               
        this.enemyPool.getChildren().forEach((enemy) => {
            if (!enemy.active) return;

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
                        princess.setPosition(player.x, player.y - 150);

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
                }})

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

                 this.enemyPool.getChildren().forEach((enemy) => {
            if (!enemy.active) return;

                // princess hits enemy
                if (
                    enemy.active &&
                    (!enemy.recentlyHitPlayer) &&
                    ((A === this.princess && B === enemy) ||
                    (A === enemy && B === this.princess))
                ) {
                    enemy.die();   // returns to pool
                }})
            });
        });


        }
    update() 
    {
        
        this.enemy.update(this.player);
        this.enemy1.update(this.player);
        this.enemy2.update(this.player);
        this.enemy3.update(this.player);
        this.enemy4.update(this.player);

        const player = this.player;
        const princess = this.princess;
        const cursors = this.cursors;
        const space = this.input.keyboard.addKey('Space');
        const xKey = this.input.keyboard.addKey('X');

        // Update player and princess
        player.update(cursors, space);
        princess.update();

        // Throw princess 
        if (Phaser.Input.Keyboard.JustDown(xKey) && player.carrying && !player.climbing){
        player.startThrow();
        
        const updateHandler = (animation, frame) => {
            if (animation.key === 'throwRight' && frame.index === 9) {  
                princess.setVisible(true);
                princess.setStatic(false);
                princess.setSensor(false);
                princess.setPosition(player.x + 50, player.y - 100);
                princess.throwRight();
                princess.bounce = -5;
                player.off('animationupdate', updateHandler);
            } else if (animation.key === 'throwLeft' && frame.index === 9) {  
                princess.setVisible(true);
                princess.setStatic(false);
                princess.setSensor(false);
                princess.setPosition(player.x - 50, player.y - 100);
                princess.throwLeft();
                princess.bounce = -5;
                player.off('animationupdate', updateHandler);
            }
        };
        
        player.on('animationupdate', updateHandler);
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

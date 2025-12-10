export class Enemy extends Phaser.Physics.Matter.Sprite { 
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'enemy');
        scene.add.existing(this);
                
        this.setFixedRotation();
        this.setIgnoreGravity(true);
        this.setFrictionAir(0.05);

        this.speed = 1;                
        this.patrolDistance = 100;
        this.originX = x;
        this.direction = 1;

        this.chaseRange = 230;
        this.chaseSpeed = 1;
        this.chaseVertical = 1;
        this.recentlyHitPlayer = false;


        // Pool defaults
        this.active = false;
        this.visible = false;
        this.setStatic(true);
    }

    // --- POOL: called when spawned ---
    activate(x, y) {
        this.setPosition(x, y);

        this.originX = x;
        this.direction = 1;

        this.setVelocity(0, 0);
        this.setStatic(false);
        
        this.active = true;
        this.visible = true;
    }

    // --- POOL: called when "dead" ---
    deactivate() {
        this.active = false;
        this.visible = false;

        this.setStatic(true);
        this.setVelocity(0, 0);

        // Move far away to avoid collision
        this.setPosition(-9999, -9999);
    }

    // Replaces destroy()
    die(){
        this.deactivate();
    }

    markPlayerHit() {
    this.recentlyHitPlayer = true;

    // after 200ms, allow princess to kill again
    this.scene.time.delayedCall(500, () => {
        this.recentlyHitPlayer = false;
    });
    }

    update(player) {
        if (!this.active) return;  // <-- required for pool safety

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        // --- Chase player ---
        if (dist < this.chaseRange) {
            const dir = dx < 0 ? -1 : 1;
            const dirY = dy < 0 ? -1 : 1;
            this.setVelocity(dir * this.chaseSpeed, dirY * this.chaseVertical);
            this.flipX = dir < 0;
            return;
        }

        // --- Horizontal Patrol ---
        this.setVelocity(this.direction * this.speed, this.body.velocity.y);

        if (this.x >= this.originX + this.patrolDistance) {
            this.direction = -1;
            this.flipX = true;
        }
        else if (this.x <= this.originX - this.patrolDistance) {
            this.direction = 1;
            this.flipX = false;
        }
    }
        
}

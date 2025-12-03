export class Enemy extends Phaser.Physics.Matter.Sprite { 
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'dudeCrouchRight');
        scene.add.existing(this);
                
        this.setFixedRotation();
        this.setIgnoreGravity(true);
        this.setFrictionAir(0.05);

        this.speed = 1;                
        this.patrolDistance = 420;
        this.originX = x;
        this.direction = 1;

        this.chaseRange = 200;
        this.chaseSpeed = 1.5;
        this.chaseVertical = 1.5;
        this.recentlyHitPlayer = false;

        this.setOnCollide(this.handleCollision.bind(this));

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

    handleCollision(data) {
    const { collision, bodyA, bodyB } = data;

    // Don't flip direction while chasing
    if (this.isChasing) return;

    const other = bodyA === this.body ? bodyB : bodyA;

    // Only care about static platforms/walls
    if (!other.isStatic) return;

    // Check collision normal to avoid flipping on top/bottom collisions
    const nx = collision.normal.x;

    // If |nx| < 0.5 then it's a top or bottom hit → ignore
    if (Math.abs(nx) < 0.5) {
        return;
    }

    // Side collision → flip direction
    this.direction *= -1;
    }



 update(player) {
    if (!this.active) return;

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // ---- Chase Player ----
    if (dist < this.chaseRange) {
        this.isChasing = true;

        const dirX = dx < 0 ? -1 : 1;
        const dirY = dy < 0 ? -1 : 1;

        this.setVelocity(dirX * this.chaseSpeed, dirY * this.chaseVertical);
        this.flipX = dirX < 0;
        return;
    }
    else {
        this.isChasing = false;
    }   

    if (!this.isChasing){
    // ---- Patrol Movement ----
    this.setVelocityX(this.direction * this.speed);
    this.flipX = this.direction < 0;

    // Border bounce
    const leftEdge = 10;
    const rightEdge = this.scene.scale.width - 10;

    if (this.x < leftEdge) this.direction = 1;
    else if (this.x > rightEdge) this.direction = -1;

    // Patrol bounds
    if (this.x >= this.originX + this.patrolDistance) {
        this.direction = -1;
    } 
    else if (this.x <= this.originX - this.patrolDistance) {
        this.direction = 1;
    }
    }
}

        
}

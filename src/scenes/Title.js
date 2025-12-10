export class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }


    create() {
        // Background
        this.add.image(-100, 0, 'title').setOrigin(0);
            

        // Start Button
        const startBtn = this.add.image(this.scale.width / 2, 400, 'start')
            .setInteractive()
            .setScale(1);

        startBtn.on('pointerdown', () => {
            this.scene.start('Game');  // Go to main gameplay
        });
    }
}

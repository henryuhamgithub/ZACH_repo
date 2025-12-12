export class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }


    create() {
        // Background
        this.add.image(0, 0, 'title').setOrigin(0);
            

        // Start Button
        const startBtn = this.add.image(this.scale.width / 2, 450, 'start')
            .setInteractive()
            .setScale(1);

        startBtn.on('pointerdown', () => {
            this.scene.start('Game');  // Go to main gameplay
        });
    }
}

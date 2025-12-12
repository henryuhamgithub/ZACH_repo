export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('title', 'titlefixed.png');
        this.load.image('start', 'startbutton.png')
        this.load.image('endscreen', 'gameoverscreenfixed.png');
        this.load.image('restart', 'tryagainbutton.png')

        //
        //WORLD OBJECTS
        //
        this.load.image('levelBackground', 'levelBackground.png');
        this.load.image('base1','base1.png');
        this.load.image('base1small','base1small.png');
        this.load.image('base1tiny','base1tiny.png');
        this.load.image('base2','base2.png');
        this.load.image('base2small','base2small.png');
        this.load.image('base3small','base3small.png');
        this.load.image('base4small','base4small.png');
        this.load.image('base5small','base5small.png');
        this.load.image('base6small','base6small.png');
        this.load.image('base7small','base7small.png');
        this.load.image('base3','base3.png');
        this.load.image('base4','base4.png');
        this.load.image('base5','base5.png');
        this.load.image('base6','base6.png');
        this.load.image('base7','base7.png');
        this.load.image('ladderLongLvl1', 'ladderLongLvl1.png');
        this.load.image('ladderShortLvl1', 'ladderShortLvl1.png');

        this.load.json('building1shapes', 'evil.json');
        this.load.image('building1', 'evil.png');

        this.load.json('building2shapes', 'building2.json');
        this.load.image('building2', 'building2.png');

        this.load.json('building3shapes', 'penthouse.json');
        this.load.image('building3', 'building3.png');

        this.load.json('slopeLShapes', 'slopeLeft.json');
        this.load.json('slopeRShapes', 'slopeRight.json');
        this.load.image('slopeR', 'slope1.png');
        this.load.image('slopeL', 'slope2.png');

        this.load.image('buttonSide', 'buttonnotpushed.png');
        this.load.image('buttonSidePressed', 'buttonpushed.png');

        

        //
        //PLAYER SPRITES AND SPRITESHEETS
        //

        this.load.image('knight', 'knightDemo.png');
        this.load.spritesheet(
            'knightRun',
            'runwithoutprincess.png',
            {frameWidth: 147, frameHeight: 155}
        );
        this.load.image('knight', 'knightDemo.png');
        this.load.spritesheet(
            'knightRunP',
            'runwithprincess.png',
            {frameWidth: 147, frameHeight: 155}
        );
        this.load.spritesheet(
            'knightIdle',
            'idlewithoutprincess.png',
            {frameWidth: 147, frameHeight: 155}
        );
        this.load.spritesheet(
            'knightChaPrin',
            'chargePrin.png',
            {frameWidth: 147, frameHeight: 155}
        );
        this.load.spritesheet(
            'knightCharge',
            'chargeNoPrin.png',
            {frameWidth: 147, frameHeight: 155}
        );
        this.load.spritesheet(
            'knightThrow',
            'throwwithprincess.png',
            {frameWidth: 147, frameHeight: 155}
        );
        this.load.spritesheet(
            'knightIdlPrin',
            'idleholdprincess.png',
            {frameWidth: 147, frameHeight: 155}
        );
        

        //
        //PRINCESS SPRITES
        //

        this.load.image('princess', 'princessground.png');
        this.load.image('princessair', 'throwprincess.png');

        //
        //ENEMY SPRITE
        //

        this.load.image('enemy', 'uglyahhenemy2.png');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Title');
    }
}

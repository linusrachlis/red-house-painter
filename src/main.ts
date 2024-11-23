import './style.css';

function draw(
    ctx: CanvasRenderingContext2D,
    size: number,
    x: number,
    y: number,
): void {
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
    canvas.width = window.visualViewport!.width;
    canvas.height = window.visualViewport!.height;
    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    ctx.fillStyle = 'red';
    let size = 10;
    let isDown = false;

    const changeFillStyle = (fillStyle: string) => {
        ctx.fillStyle = fillStyle;
    };
    const changeSize = (newSize: number) => {
        size = newSize;
    };

    const button_color_black = document.querySelector<HTMLButtonElement>(
        '#button_color_black',
    )!;
    const button_color_red =
        document.querySelector<HTMLButtonElement>('#button_color_red')!;
    const button_color_green = document.querySelector<HTMLButtonElement>(
        '#button_color_green',
    )!;
    const button_color_yellow = document.querySelector<HTMLButtonElement>(
        '#button_color_yellow',
    )!;
    const button_color_blue =
        document.querySelector<HTMLButtonElement>('#button_color_blue')!;
    const button_color_white = document.querySelector<HTMLButtonElement>(
        '#button_color_white',
    )!;
    const input_size = document.querySelector<HTMLInputElement>('#input_size')!;

    button_color_black.addEventListener('click', () => {
        changeFillStyle('black');
    });
    button_color_red.addEventListener('click', () => {
        changeFillStyle('red');
    });
    button_color_green.addEventListener('click', () => {
        changeFillStyle('green');
    });
    button_color_yellow.addEventListener('click', () => {
        changeFillStyle('yellow');
    });
    button_color_blue.addEventListener('click', () => {
        changeFillStyle('blue');
    });
    button_color_white.addEventListener('click', () => {
        changeFillStyle('white');
    });

    input_size.addEventListener('change', (e) => {
        changeSize(parseInt((e.target as HTMLInputElement).value));
    });

    canvas.addEventListener('pointerdown', (e) => {
        isDown = true;
        // console.log('pointerdown', e.pointerId);
        canvas.setPointerCapture(e.pointerId);
        draw(ctx, size, e.offsetX, e.offsetY);
        e.preventDefault();
    });
    canvas.addEventListener('pointerup', (e) => {
        isDown = false;
        // console.log('pointerup', e.pointerId);
        canvas.setPointerCapture(e.pointerId);
        draw(ctx, size, e.offsetX, e.offsetY);
        e.preventDefault();
    });
    canvas.addEventListener('pointermove', (e) => {
        // console.log('pointermove', e.pointerId);
        if (isDown) {
            draw(ctx, size, e.offsetX, e.offsetY);
        }
        e.preventDefault();
    });
    canvas.addEventListener(
        'touchstart',
        (e) => {
            e.preventDefault();
        },
        { passive: false },
    );

    canvas.addEventListener(
        'touchmove',
        (e) => {
            e.preventDefault();
        },
        { passive: false },
    );
});

import setPlatformClass from '../setPlatformClass';

describe('setPlatformClass util',()=>{

    it('empty element ref',()=>{
        const rawPlatform = new String('rawPlatform str');
        Object.defineProperty(rawPlatform,'toLowerCase',{
            value:jest.fn(),
            writable: true,
        });

        setPlatformClass(undefined,rawPlatform as string);
        expect(rawPlatform.toLowerCase).not.toHaveBeenCalled();
    })

    it('mac platform recognized',()=>{
        const rawPlatform = 'Mac';
        const el = {
            classList:{
                add:jest.fn()
            }
        };
        setPlatformClass(el,rawPlatform);

        expect(el.classList.add).toHaveBeenCalled();

    })

    it('win platform recognized',()=>{
        const rawPlatform = 'Window 7';
        const el = {
            classList:{
                add:jest.fn()
            }
        };
        setPlatformClass(el,rawPlatform);

        expect(el.classList.add).toHaveBeenCalled();

    })

    it('other platform recognized',()=>{
        const rawPlatform = 'other';
        const el = {
            classList:{
                add:jest.fn()
            }
        };
        setPlatformClass(el,rawPlatform);

        expect(el.classList.add).toHaveBeenCalled();

    })

});
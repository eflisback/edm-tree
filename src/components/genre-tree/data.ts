import { Genre } from './types'

export const edm: Genre = {
  title: 'Electronic Dance Music',
  subgenres: [
    {
      title: 'House',
      subgenres: [
        { title: 'Deep House', subgenres: [] },
        { title: 'Progressive House', subgenres: [] },
        { title: 'Tech House', subgenres: [] },
        {
          title: 'Bass House',
          subgenres: [],
        },
        {
          title: 'Electro House',
          subgenres: [
            { title: 'Complextro', subgenres: [] },
            { title: 'Big Room', subgenres: [] },
          ],
        },
      ],
    },
    {
      title: 'Techno',
      subgenres: [
        { title: 'Detroit Techno', subgenres: [] },
        { title: 'Minimal Techno', subgenres: [] },
        { title: 'Acid Techno', subgenres: [] },
      ],
    },
    {
      title: 'Trance',
      subgenres: [
        { title: 'Uplifting Trance', subgenres: [] },
        { title: 'Progressive Trance', subgenres: [] },
        { title: 'Psytrance', subgenres: [] },
      ],
    },
    {
      title: 'Garage',
      subgenres: [
        {
          title: 'UK Garage',
          subgenres: [
            {
              title: '2-Step Garage',
              subgenres: [],
            },
            {
              title: 'Speed Garage',
              subgenres: [],
            },
          ],
        },
        {
          title: 'Dubstep',
          subgenres: [
            {
              title: 'Brostep',
              subgenres: [
                {
                  title: 'Test 1',
                  subgenres: [
                    {
                      title: 'Wow 1',
                      subgenres: [],
                    },
                    {
                      title: 'Wow 2',
                      subgenres: [],
                    },
                  ],
                },
                {
                  title: 'Test 2',
                  subgenres: [],
                },
              ],
            },
            { title: 'Riddim', subgenres: [] },
          ],
        },
        {
          title: 'Future Bass',
          subgenres: [],
        },
      ],
    },
    {
      title: 'Drum and Bass',
      subgenres: [
        { title: 'Liquid DnB', subgenres: [] },
        { title: 'Neurofunk', subgenres: [] },
        { title: 'Jump-Up', subgenres: [] },
      ],
    },
    {
      title: 'Hardstyle',
      subgenres: [
        { title: 'Rawstyle', subgenres: [] },
        { title: 'Euphoric Hardstyle', subgenres: [] },
      ],
    },
    {
      title: 'Ambient / Downtempo',
      subgenres: [
        { title: 'Chillstep', subgenres: [] },
        { title: 'Lo-fi', subgenres: [] },
      ],
    },
  ],
}

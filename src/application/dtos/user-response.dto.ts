import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user response
 * Represents the user data returned to the client
 */
export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'clh1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User creation timestamp',
    example: '2023-12-01T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User last update timestamp',
    example: '2023-12-01T10:00:00.000Z',
  })
  updatedAt: Date;

  constructor(user: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

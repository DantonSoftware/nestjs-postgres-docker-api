import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    @Get()
    @ApiOperation({ summary: 'Verificar el estado de la salud del servicio' })
    check() {
        return { status: 'ok' };
    }
}
